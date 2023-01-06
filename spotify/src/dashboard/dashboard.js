import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../comman";
// console.log(logout())


const onProfileClick = (event)=>{
    event.stopPropagation();
    const profileMenu = document.querySelector("#profile-menu")
    profileMenu.classList.toggle("hidden");
    if(!profileMenu.classList.contains("hidden")){
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

const onPlaylistItemClicked = (event)=>{
    console.log(event.target.parentNode);
}

const loadfeaturedPlaylist = async ()=>{
    const {playlists:{items}} = await fetchRequest(ENDPOINT.featuredPlaylist) 
    const playlistItemsSection = document.querySelector('#featured-playlist-items');
     
   
    for(let { name, description, images, id } of items){
        const playlistItem = document.createElement("section");
        playlistItem.className = "rounded p-4 border-2 hover:cursor-pointer";
        playlistItem.id = id;
        playlistItem.setAttribute("data-type", "playlist");
        playlistItem.addEventListener("click", onPlaylistItemClicked)

        const [{ url:imageurl }] = images;
        playlistItem.innerHTML = `<img src="${imageurl}" alt="${name}" class="rounded mb-2 object-contain shadow" />
            <h2 class="text-sm">${name}</h2>
            <h3 class="text-sx">${description}</h3>`;


            playlistItemsSection.appendChild(playlistItem);
      
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    loadfeaturedPlaylist();
    document.addEventListener("click", ()=>{
        const profileMenu = document.querySelector("#profile-menu")
        if(!profileMenu.classList.contains("hidden")){
            profileMenu.classList.add("hidden");
        }
    })
})