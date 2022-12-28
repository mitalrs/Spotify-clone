import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../comman";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// const CLIENT_ID = "19f033cc2db7431f9de61a310e7704bf";
const REDIRECT_URI = "http://localhost:3000/login/login.html"
const APP_URL = "http://localhost:3000";
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";
// const ACCESS_TOKEN_KEY = "accessToken";

const authorizeUser = ()=>{
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.open(url, "login", "width=800", "height=600");
}

document.addEventListener("DOMContentLoaded", ()=>{
    const loginButton = document.getElementById("login-spotify");
    loginButton.addEventListener("click", authorizeUser);
})

window.setItemsInLocalStorage = ({accessToken, tokenType, expiresin})=>{
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, expiresin);
    window.location.href = APP_URL;
}

window.addEventListener("load", ()=>{
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(accessToken){
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }


    if(window.opener !==null && !window.opener.closed){
        // alert("inside opener");
        window.focus();
        if(window.location.href.includes("error")){
            window.close();
        }

        // "#access_token=BQBQWgjT5IyXTi5mtQ6XYPm_R34KFKaFdrb1j1TgEtLYxso-gd5Zn0MGNjUTkSlZlVAwwp16RD2BQqAUZ0M1yKb-8QpHoMQ_B4tajNeEz9HAbwp6oeKCvRD_PcdfCq4N7Di0eExbsQvWF3D9NljYdKhVUDMDzvK0MYiCbMcU7gUyP7Yf0CIiiB0tCAZmqO5rtioxR6dpsDbmK3V4ZrXB3dmiBSzUbIFo_Z77Jg&token_type=Bearer&expires_in=3600"
        // console.log(window.location.hash);
        const {hash} = window.location;
        console.log(hash)
        const searchParams = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");
        const tokenType = searchParams.get("token_type");
        const expiresin = searchParams.get("expires_in");
        if(accessToken){
            window.close();
            window.opener.setItemsInLocalStorage({ accessToken, tokenType, expiresin });
        }else{
            window.close();
        }
    }
})