import { fetchRequest } from "../api";
import { ENDPOINT } from "../comman";

const loadUserProfile = async () => {
    const defaultImg = document.querySelector("#default-img");
    const profileButton = document.querySelector("#user-profile-btn");
    const diplayNameElement = document.querySelector("#uer-name");


    const {diplay_name:diplayName, images } = await fetchRequest(ENDPOINT.userInfo);


    if(images?.length){
        defaultImg.classList.add("hidden");
    }else{
        defaultImg.classList.remove("hidden");
    }
    
    diplayNameElement.textContent = diplayName;
}



document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
})