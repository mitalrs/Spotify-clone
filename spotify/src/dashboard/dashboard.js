import { fetchRequest } from "../api";
import { ENDPOINT } from "../comman";

const loadUserProfile = async () => {
    const dafaultImg = document.querySelector("#default-img");
    const profileButton = document.querySelector("#user-profile-btn");
    const diplayNameElement = document.querySelector("#uer-name");


    const {diplay_name:diplayName, images } = await fetchRequest(ENDPOINT.userInfo);
    
}



document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
})