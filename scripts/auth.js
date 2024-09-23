const USER_TOKEN = 'userToken';

function IsUserLogin(){
    return Boolean(localStorage.getItem(USER_TOKEN));
}
function login(username,password){
    fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        body:JSON.stringify({
            username,
            password,
        })
    })
        .then(res=>res.json())
        .then(json=>localStorage.setItem(USER_TOKEN,json));
        // так делать нельзя...
}
function logout(){
    if(localStorage.getItem(USER_TOKEN)) localStorage.removeItem(USER_TOKEN);
}