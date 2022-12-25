const CLIENT_ID = "19f033cc2db7431f9de61a310e7704bf";
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";
const REDIRECT_URI = "http://localhost:3000/login/login.html"
const ACCESS_TOKEN_KEY = "accessToken";
const APP_URL = "http://localhost:3000";

const authorizeUser = ()=>{
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.open(url, "login", "width=800", "height=600");
}

document.addEventListener("DOMContentLoaded", ()=>{
    const loginButton = document.getElementById("login-spotify");
    loginButton.addEventListener("click", authorizeUser);
})

window.addEventListener("load", ()=>{
    const accessToken = localStrorage.getItem(ACCESS_TOKEN_KEY);
    if(accessToken){
        window.location.href = "http://location"
    }
})