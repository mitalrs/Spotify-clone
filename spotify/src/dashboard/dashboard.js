import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../comman";


const onProfileClick = (event)=>{
    event.stopPropagation();
    const profileMenu = document.querySelector("#profile-menu")
    profileMenu.classList.toggle("hidden");
    if(profileMenu.classList.contains("hidden")){
        profileMenu.querySelector("li#logout").addEventListener("click", logout)
    }
}

const loadUserProfile = async () => {
    const defaultImg = document.querySelector("#default-img");
    const profileButton = document.querySelector("#user-profile-btn");
    const diplayNameElement = document.querySelector("#uer-name");


    // const userInfo = await fetchRequest(ENDPOINT.userInfo);
    // console.log(userInfo)

    const {display_name:diplayName, images } = await fetchRequest(ENDPOINT.userInfo);


    if(images?.length){
        defaultImg.classList.add("hidden");
    }else{
        defaultImg.classList.remove("hidden");
    }


    profileButton.addEventListener("click", onProfileClick)
    
    diplayNameElement.textContent = diplayName;
}



document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    document.addEventListener("click", ()=>{
        const profileMenu = document.querySelector("#profile-menu")
        if(!profileMenu.classList.contains("hidden")){
            profileMenu.classList.add("hidden");
        }
    })
})