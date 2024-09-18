const buttonMain = document.getElementById('main');
const buttonProducts = document.getElementById('products');
const buttonCart = document.getElementById('cart');
const buttonProfile = document.getElementById('profile');
const buttonAuth = document.getElementById('auth');

buttonMain.addEventListener('click', function() {
    window.location.href = './main.html'; // Замените URL на нужный
});
buttonProducts.addEventListener('click', function() {
    window.location.href = './products.html'; // Замените URL на нужный
});
buttonCart.addEventListener('click', function() {
    window.location.href = './cart.html'; // Замените URL на нужный
});
buttonProfile.addEventListener('click', function() {
    window.location.href = './profile.html'; // Замените URL на нужный
});
buttonAuth.addEventListener('click', function() {
    window.location.href = './auth.html'; // Замените URL на нужный
});