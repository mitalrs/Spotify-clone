import { fetchRequest } from "../api";
import { ENDPOINT, logout, SECTIONTYPE } from "../comman";
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

const onPlaylistItemClicked = (event, id)=>{
    console.log(event.target.parentNode);
    const section = { type: SECTIONTYPE.PLAYLIST, playlist: id }
    history.pushState(section,"",`playlist/${id}`);
    loadSection(section);
}

const loadPlaylist = async (endpoint, elementId)=>{
    const {playlists:{items}} = await fetchRequest(endpoint)
    const playlistItemsSection = document.querySelector(`#${elementId}`);
     
   
    for(let { name, description, images, id } of items){
        const playlistItem = document.createElement("section");
        playlistItem.className = "bg-black-secondary rounded p-4 hover:cursor-pointer hover:bg-light-black";
        playlistItem.id = id;
        playlistItem.setAttribute("data-type", "playlist");
        playlistItem.addEventListener("click",(event)=> onPlaylistItemClicked(event, id))

        const [{ url:imageurl }] = images;
        playlistItem.innerHTML = `<img src="${imageurl}" alt="${name}" class="rounded mb-2 object-contain shadow" />
            <h2 class="text-base font-semibold mb-4 truncate">${name}</h2>
            <h3 class="text-sm text-secondary line-clamp-2">${description}</h3>`;


            playlistItemsSection.appendChild(playlistItem);
      
    }
}

const loadPlaylists = ()=>{
    loadPlaylist(ENDPOINT.featuredPlaylist, "featured-playlist-items")
    loadPlaylist(ENDPOINT.toplists, "top-playlist-items")
}

const fillContentForDashboard = ()=>{
    const pageontaint = document.querySelector("#page-containt");
    const playlistMap = new Map([["featured","featured-playlist-items"],["top playlists","top-playlist-items"]]);
    let innerHTML = "";
    for(let [type, id] of playlistMap){
        innerHTML +=`
        <article class="p-4">
        <h1 class="text-2xl mb-4 font-bold capitalize">${type}</h1>
        <section id="${id}" class="featured-songs grid grid-cols-auto-fill-cards gap-4">

        </section>
    </article>
`
    }
    pageontaint.innerHTML = innerHTML;
}

const loadPlaylistTracks = ({tracks})=>{
    const trackSections = document.querySelector('#tracks');

    // <section class="track items-center justify-items-start grid grid-cols-[50px_2fr_1fr_50px] gap-4 rounded-md hover:bg-light-black text-secondary">
    //                         <p class="justify-self-center">1</p>
    //                         <section class="grid grid-cols-2 gap-2">
    //                             <img class="h-8 w-8" src="" alt="">
    //                             <article class="flex flex-col gap-1">
    //                                 <h2 class="text-white text-xl">song</h2>
    //                                 <p class="text-sm">artists</p>
    //                             </article>
    //                         </section>
    //                         <p>Album</p>
    //                         <p>1:36</p>
    //                     </section>
    for(let trackItem of tracks.items){
        let {id, artists, name, album, duration_ms:duration} = trackItem.track;
        console.log(trackItem.tracks)
        let track = document.createElement("section");
        track.className = "track p-1 items-center justify-items-start grid grid-cols-[50px_2fr_1fr_50px] gap-4 rounded-md hover:bg-light-black text-secondary";
        let image = album.images.find(img=> img.height === 64);
        track.innerHTML = `
        <p class="justify-self-center">1</p>
                            <section class="grid grid-cols-2 gap-2">
                                 <img class="h-8 w-8" src="${image.url}" alt="${name}">
                                 <article class="flex flex-col gap-1">
                                    <h2 class="text-white text-xl">${name}</h2>
                                    <p class="text-sm">${Array.from(artists, artist=> artist.name).join(", ")}</p>
                                </article>
                            </section>
                            <p>${album.name}</p>
                            <p>${duration}</p>`;
                            trackSections.appendChild(track);
    }

}

const fillContentForPlaylist = async(playlistId)=>{
    const playlist = await fetchRequest(`${ENDPOINT.playlist}/${playlistId}`)
    const pageontaint = document.querySelector("#page-containt");
    pageontaint.innerHTML = `
    <header class="px-8">
        <nav>
            <ul class="grid grid-cols-[50px_2fr_1fr_50px] gap-4 text-secondary">
                <li class="justify-self-center">#</li>
                <li>Title</li>
                <li>Album</li>
                <li>timer</li>
            </ul>
        </nav>
   </header>
   <section id="tracks" class="px-8">
   </section>`


 
   loadPlaylistTracks(playlist)
  
    console.log(playlist)
}

const loadSection = (section)=>{
    if(section.type === SECTIONTYPE.DASHBOARD){
        fillContentForDashboard();
        loadPlaylists();
    }else if(section.type === SECTIONTYPE.PLAYLIST){
        //load the element for playlist
        fillContentForPlaylist(section.playlist)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    const section = {type:SECTIONTYPE.DASHBOARD};
    history.pushState(section,"","");
    loadSection(section);
    document.addEventListener("click", ()=>{
        const profileMenu = document.querySelector("#profile-menu")
        if(!profileMenu.classList.contains("hidden")){
            profileMenu.classList.add("hidden");
        }
    })

    document.querySelector(".content").addEventListener("scroll", (event)=>{
        const{scrollTop} = event.target;
        const header = document.querySelector(".header");
        if(scrollTop>= header.offsetHeight){
            header.classList.add("sticky","top-0","bg-black-secondary");
            header.classList.remove("bg-transparent");
        }else{
            header.classList.remove("sticky","top-0","bg-black-secondary");
            header.classList.add("bg-transparent");
        }
    })
    window.addEventListener("popstate",(event)=>{
        loadSection(event.state);
    })
})