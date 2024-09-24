document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.getElementById('product-cards');

    // Получаем категорию из sessionStorage
    const selectedCategory = sessionStorage.getItem('category'); // Предположим, категория хранится под ключом 'category'

    // Функция для получения случайных элементов из массива
    function getRandomItems(arr, count) {
        let shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Загружаем данные из API
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            let filteredProducts;

            // Если категория в sessionStorage есть, фильтруем по ней
            if (selectedCategory) {
                filteredProducts = products.filter(product => product.category === selectedCategory);
            } else {
                // Если категории нет, используем все товары
                filteredProducts = products;
            }

            // Проверяем, что есть товары для отображения
            if (filteredProducts.length > 0) {
                // Выбираем 6 случайных товаров
                const randomProducts = getRandomItems(filteredProducts, 6);

                // Отображаем товары на странице
                randomProducts.forEach(product => {
                    // Создаем элемент для каждого товара
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.id = `product-card-item${product.id}`;

                    // Устанавливаем изображение как фон
                    productCard.style.backgroundImage = `url('${product.image}')`;
                    
                    productCard.innerHTML = `
                        <div class="product-footer">
                            <div class="product-price">$${product.price}</div> 
                            <div class="product-name">${product.title}</div> 
                        </div>
                        <img src="./images/cart48.png" alt="cart-icon" class="cart-icon">
                    `;
                    productCards.appendChild(productCard);
                });
            } else {
                productCards.innerHTML = '<p>Нет товаров для выбранной категории</p>';
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            productCards.innerHTML = '<p>Не удалось загрузить товары</p>';
        });
});
