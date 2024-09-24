function saveProductToCart(id){
    sessionStorage.setItem(`${id}product`,id);
}
function removeProductFromCart(id){
    sessionStorage.removeItem(`${id}product`);
}
function productCardClickHandler(node,id){
    if(sessionStorage.getItem(`${id}product`)){
        removeProductFromCart(id);
        node.classList.remove("saved");
    } else {
        saveProductToCart(id);
        node.classList.add("saved");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');

    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            if (categories.length > 0) {
                const listItemEverythingButton = document.createElement('li');
                listItemEverythingButton.textContent = "Everything";
                listItemEverythingButton.classList.add('category-item');
                listItemEverythingButton.addEventListener('click', () => {
                    sessionStorage.removeItem('category');
                    categoryClickHandler();
                    console.log('Выбраны все категории!');
                });
                categoryList.appendChild(listItemEverythingButton);
                categories.forEach((category, index) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = category;
                    listItem.classList.add('category-item');

                    listItem.addEventListener('click', () => {
                        sessionStorage.setItem('category', category);
                        categoryClickHandler();
                        console.log(`Выбрана категория: ${category}`);
                    });

                    categoryList.appendChild(listItem);
                });
            } else {
                categoryList.innerHTML = '<li>Нет доступных категорий</li>';
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке категорий:', error);
            categoryList.innerHTML = '<li>Не удалось загрузить категории</li>';
        });
});

let filteredProducts;
let listNumber = 1;
categoryClickHandler();
function categoryClickHandler() {
    const selectedCategory = sessionStorage.getItem('category');
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json()).then(products => {
            filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
            listNumber = 1;
            renderCards();
        });
}

function renderCards() {
    const productCards = document.getElementById('product-cards');
    while (productCards.firstChild) {
        productCards.removeChild(productCards.firstChild);
    }
    if (filteredProducts.length > 0) {
        // Отображаем товары на странице

        for (let i = (listNumber - 1) * 9; i < listNumber * 9 && i < filteredProducts.length; i++) {
            const product = filteredProducts[i];
            // Создаем элемент для каждого товара
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.id = `product-card-item${product.id}`;

            // Устанавливаем изображение как фон
            productCard.style.backgroundImage = `url('${product.image}')`;

            const productFooter = document.createElement("div");
            productFooter.classList.add('product-footer');
            productFooter.innerHTML =`
            <div class="product-price">$${product.price}</div> 
            <div class="product-name">${product.title}</div>
            ` 
            const cart = document.createElement("img");
            cart.src = "./images/cart48.png";
            cart.alt="cart-icon";
            cart.classList.add('cart-icon');
            cart.addEventListener("click",()=>{
                productCardClickHandler(cart,product.id);
            })
            if(sessionStorage.getItem(`${product.id}product`)) cart.classList.add('saved');
            productCard.appendChild(cart);
            productCard.appendChild(productFooter);
            productCards.appendChild(productCard);
        }
    } else {
        productCards.innerHTML = '<p>Нет товаров для выбранной категории</p>';
    }
    updatePageNumber();
}
const lessButton = document.getElementById("load-less");
const moreButton = document.getElementById("load-more");
const pageNumber = document.getElementById("page-number");

function updatePageNumber(){
    pageNumber.textContent = listNumber;
}

lessButton.addEventListener('click', () => {
    if (listNumber > 1) {
        listNumber--; 
        renderCards();
    }
});
moreButton.addEventListener('click',()=>{
    if(listNumber*9 < filteredProducts.length){ 
        listNumber++;
        renderCards();
     }
});