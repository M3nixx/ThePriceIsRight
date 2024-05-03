"use strict";

async function fetchStores(page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/store/find?name=%25&page=' + page + '&size=' + pagesize, config);
    const stores = await response.json();
    return stores;
}
document.addEventListener('DOMContentLoaded', async () => {
        //Ihre Lösung hier
        console.log(await fetchStores(0, 50));
        const stores = await fetchStores(0, 50);
        displayStoresAsTable(stores);
        /*
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
        */
    });


function displayStoresAsTable(stores) {
    var tbody = document.querySelector('#storeTable tbody');
  
    tbody.innerHTML = '';

    stores.content.forEach(function(store) {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${store.name}</td>
        <td>${store.id}</td>
      `;
      row.classList.add('highlighted-row');
      tbody.appendChild(row);

      row.addEventListener('click', function() {
        window.location.href = 'neueSeite.html?id=' + store.id;
      });
    });

}


