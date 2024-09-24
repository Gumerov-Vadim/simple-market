const USER_TOKEN = sessionStorage.getItem("userToken");
if(!USER_TOKEN){
    window.location.href="./auth.html";
}
const USERID = sessionStorage.getItem("userID");
let cartProducts = [];
if(sessionStorage.length>2){
    let j = 0;
    for(let i = 0; i<sessionStorage.length; i++){
        let currentKey = sessionStorage.key(i);
        if(currentKey.includes("product")){
            cartProducts[j] = sessionStorage[currentKey];
            j++;
        }
    }
}
if(cartProducts.length > 0){
    document.getElementById("empty-cart").classList.add("invisible");
    const cartProductsList = document.getElementById("cart-products");
    
    for(let i = 0; i < cartProducts.length; i++){
        const element = document.createElement("li");
        element.classList.add("cart-product"); // Можно добавить класс для оформления

        fetch(`https://fakestoreapi.com/products/${cartProducts[i]}`)
        .then(res => res.json())
        .then(product => {
            
            const productFooter = document.createElement("div");
            productFooter.innerHTML =`
            <div class="product-price">$${product.price}</div> 
            <div class="product-name">${product.title}</div>
            ` 
            productFooter.classList.add("product-footer");

            element.innerHTML = `
            <div class="cart-product-quantity">
                <button class="quantity-btn" id="decrease-btn-${i}">-</button>
                <span id="quantity-${i}">1</span>
                <button class="quantity-btn" id="increase-btn-${i}">+</button>
            </div>
            `;
            element.appendChild(productFooter);
            // Установка фонового изображения
            element.style.backgroundImage = `url(${product.image})`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            cartProductsList.appendChild(element);

            // Логика для кнопок увеличения и уменьшения количества
            const quantityElement = document.getElementById(`quantity-${i}`);
            let quantity = 1;

            document.getElementById(`decrease-btn-${i}`).addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                }
            });

            document.getElementById(`increase-btn-${i}`).addEventListener('click', () => {
                quantity++;
                quantityElement.textContent = quantity;
            });
        })
        .catch(error => console.error('Error fetching product:', error));
    }
}
