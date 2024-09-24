const buttonMain = document.getElementById('main');
const buttonProducts = document.getElementById('products');
const buttonCart = document.getElementById('cart');
const buttonProfile = document.getElementById('profile');
const buttonAuth = document.getElementById('auth');

const TOKEN = sessionStorage.getItem("userToken");

buttonMain.addEventListener('click', function() {
    window.location.href = './main.html'; // Замените URL на нужный
});
buttonProducts.addEventListener('click', function() {
    window.location.href = './products.html'; // Замените URL на нужный
});
buttonCart.addEventListener('click', function() {
    window.location.href = TOKEN?'./cart.html':'./auth.html'; // Замените URL на нужный
});
buttonProfile.addEventListener('click', function() {
    window.location.href = TOKEN?'./profile.html':'./auth.html'; // Замените URL на нужный
});
buttonAuth.addEventListener('click', function() {
    window.location.href = './auth.html'; // Замените URL на нужный
});