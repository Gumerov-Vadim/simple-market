const USER_TOKEN = 'userToken';
const USER_ID = 'userID';
function IsUserLogin(){
    return Boolean(sessionStorage.getItem(USER_TOKEN));
}
function login(username,password){
    console.log(username,password);
    //http метод не поддерживается
    fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        body:JSON.stringify({
            username:username,
            password:password,
        })
    })
        .then(res=>res.json())
        .then(json=>{
            sessionStorage.setItem(USER_TOKEN,json);

            if(IsUserLogin()){ window.location.href=("./main.html"); } else {
            }
        }).catch(error=>{
            console.log('http метод не поддерживается',error);
        });

        sessionStorage.setItem(USER_TOKEN,username+password);
        sessionStorage.setItem(USER_ID,String(sessionStorage.getItem(USER_TOKEN).length%10));
        window.location.href=("./main.html");
     
}
function register(username,email,password,passwordConfirm){
   
    let element = regForm.getElementsByClassName("authError");
    if(element){
        while(element.length){
            element[0].parentNode.removeChild(element[0]);
        }
    }

    function registerError(node,message){
        let error = document.createElement("span");
        error.classList.add("authError");
        error.textContent = message;
        node.after(error);
    }
    
    //Валидация
    // (username,email,password,passwordConfirm)=>{
        let isValidate = true;
        if(username.length>16){
            const node = regForm.querySelector("input[name='userName']");
            isValidate = false;
            registerError(node,"Имя пользователя должно быть меньше 16 символов");
        }
        if(username.length<2){
            const node = regForm.querySelector("input[name='userName']");
            isValidate = false;
            registerError(node,"Слишком короткое имя!");
        }
        if(!email.includes("@")){
            const node = regForm.querySelector("input[name='userMail']");
            isValidate = false;
            registerError(node,"Не существующая почта!");            
        }
        if(password.length<8){
            const node = regForm.querySelector("input[name='userPassword']");
            isValidate = false;
            registerError(node,"Слишком короткий пароль!");            
        }
        if(password.length>26){
            const node = regForm.querySelector("input[name='userPassword']");
            isValidate = false;
            registerError(node,"Слишком длинные пароль!");            
        }
        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            const node = regForm.querySelector("input[name='userPassword']");
            isValidate = false;
            registerError(node, "Пароль должен содержать буквы и цифры!");
        }
        if(password!==passwordConfirm){
            const node = document.querySelector("input[name='userPasswordConfirm']");
            isValidate = false;
            registerError(node, "Пароли должны совпадать!");
        }        
        if(!isValidate) {
            return false;
        }

    fetch('https://fakestoreapi.com/users',{
        method:"POST",
        body:JSON.stringify(
            {
                email,
                username,
                password,
                name:{
                    firstname: username,
                    lastname: email,
                },
                address:{
                    city:'kilcoole',
                    street:'7835 new road',
                    number:3,
                    zipcode:'12926-3874',
                    geolocation:{
                        lat:'-37.3159',
                        long:'81.1496'
                    }
                },
                phone:'1-570-236-7033'
            }
        )
    })
        .then(res=>res.json())
        .then(data=>{
            login(username,password);
        })
        .catch(error=>{
            console.log('Ошибка регистрации: ',error);
        });
}
function logout(){
    if(sessionStorage.getItem(USER_TOKEN)) sessionStorage.removeItem(USER_TOKEN);
}

const switchModeButtons = document.getElementsByClassName("switch-mode");
for(let i = 0; i < switchModeButtons.length; i++){
    switchModeButtons[i].addEventListener("click",()=>{Mode.switchMode();});
};
const MODE = {
    REGISTER: "register",
    AUTHORIZATION: "authorization",
}
const Mode = {
    selectedMode: MODE.AUTHORIZATION,
    switchMode: function(){
        this.selectedMode = this.selectedMode === MODE.AUTHORIZATION ? MODE.REGISTER : MODE.AUTHORIZATION;
        this.switchModeHandler();
    },
    switchModeHandler:function(){
        switchDialogWindow(this.selectedMode);
    }
}

const authForm = document.getElementById("Authorization");
const regForm = document.getElementById("Registration");
function switchDialogWindow(selectedMode){
    const invisible = "invisible";
    authForm.classList.remove(invisible);
    regForm.classList.remove(invisible);
    if(selectedMode===MODE.REGISTER){
        authForm.classList.add(invisible);
    } else {
        regForm.classList.add(invisible);
    }
}

// Функция для получения данных из формы авторизации
function getAuthFormData() {
    const userName = authForm.querySelector('input[name="userName"]').value;
    const userPassword = authForm.querySelector('input[name="userPassword"]').value;
    login(userName,userPassword);
}

// Функция для получения данных из формы регистрации
function getRegFormData() {
    const userName = regForm.querySelector('input[name="userName"]').value;
    const userMail = regForm.querySelector('input[name="userMail"]').value;
    const userPassword = regForm.querySelector('input[name="userPassword"]').value;
    const userPasswordConfirm = regForm.querySelector('input[name="userPasswordConfirm"]').value;
    register(userName,userMail,userPassword,userPasswordConfirm);
}

// Добавляем обработчики событий на кнопки
document.addEventListener('DOMContentLoaded', () => {
    // Обработчик для кнопки "Войти"
    document.querySelector('#Authorization .button').addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартное поведение
        getAuthFormData();
    });

    // Обработчик для кнопки "Зарегистрироваться"
    document.querySelector('#Registration .button').addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартное поведение
        getRegFormData();
    });
})