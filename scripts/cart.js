const USER_TOKEN = sessionStorage.getItem("userToken");
if(!USER_TOKEN){
    window.location.href="./auth.html";
}
const USERNAME = sessionStorage.getItem("userName");
const USETID = sessionStorage.getItem("");