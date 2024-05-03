"use strict";

async function fetchImages() {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    const response = await fetch('api/images', config);
    const images = await response.json();
    return images;
}
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById("loadContent").addEventListener("click", async ()=>{
        //Ihre Lösung hier
        const container = document.getElementById("container");
        const images = await fetchImages();
        for(let i = 0;i<images.length;i++){
            const div = document.createElement('div');
            div.className = "imgContainer";
            div.innerHTML = `<img
            src="${images[i].link}"
            title="abc"
            alt="">`;
            container.appendChild(div);
        }
    });
});
