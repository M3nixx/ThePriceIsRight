"use strict";

let currentPage = 0;
let totalPages = 0;

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
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  console.log(await fetchStores(0, 30));
  const stores = await fetchStores(0, 30);
  totalPages = stores.info.totalPages;
  displayStoresAsTable(await fetchStores(currentPage, 30));
  updatePaginationLabel();
  updateButtons();
  console.log(currentPage);
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

  document.getElementById("prev").addEventListener("click", async () => {
    if (currentPage > 0) {
      currentPage--;
      displayStoresAsTable(await fetchStores(currentPage, 30));
      updatePaginationLabel();
      updateButtons();
    }
  });

  document.getElementById("next").addEventListener("click", async () => {
    if (currentPage < stores.info.totalPages - 1) {
      currentPage++;
      displayStoresAsTable(await fetchStores(currentPage, 30));
      updatePaginationLabel();
      updateButtons();
    }
  });
  function updateButtons(){
    if(currentPage === 0){
        prevButton.classList.add('disabled');
        prevButton.disabled = true;
    } else {
        prevButton.classList.remove('disabled');
        prevButton.disabled = false;
    }

    if(currentPage === stores.info.totalPages -1) {
        nextButton.classList.add('disabled');
        nextButton.disabled = true;
    } else {
        nextButton.classList.remove('disabled');
        nextButton.disabled = false;
    }
}
document.getElementById("backHome").addEventListener("click", async () => {
  window.location.href = 'HomePage.html';
})
});

function displayStoresAsTable(stores) {
  var tbody = document.querySelector('#storeTable tbody');

  tbody.innerHTML = '';

  stores.content.forEach(function (store) {
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${store.name}</td>
        <td>${store.id}</td>
      `;
    row.classList.add('highlighted-row');
    tbody.appendChild(row);

    row.addEventListener('click', function () {
      window.location.href = 'StoreInfo.html?id=' + store.id;
    });
  });

}
function updatePaginationLabel() {
  document.querySelector('label').textContent = `Seite ${currentPage + 1} von ${totalPages}`;
}