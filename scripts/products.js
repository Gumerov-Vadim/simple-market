document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');

    // Загружаем категории из API
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            // Проверяем, что категории загружены
            if (categories.length > 0) {
                categories.forEach((category, index) => {
                    // Создаем элемент списка для каждой категории
                    const listItem = document.createElement('li');
                    listItem.id = `category-${index}`; // Устанавливаем id для каждой категории

                    const categoryName = document.createElement('span'); // Создаем элемент span для названия категории
                    categoryName.textContent = category; // Устанавливаем текст для span
                    categoryName.classList.add('category-name'); // Можно добавить стиль при необходимости

                    // Добавляем обработчик события для клика по категории
                    listItem.addEventListener('click', () => {
                        localStorage.setItem('categoryId', listItem.id); // Сохраняем id категории в localStorage
                        console.log(`Выбрана категория: ${category}, id: ${listItem.id}`);
                    });

                    // Добавляем span в li
                    listItem.appendChild(categoryName);
                    // Добавляем элемент списка в боковую панель
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
