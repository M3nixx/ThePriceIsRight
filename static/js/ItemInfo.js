"use strict";

let currentPage = 0;
let totalPages = 0;
async function fetchItemByGtin(gtin) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/item/' + gtin, config);
    const item = await response.json();
    return item;
}
async function fetchReceipts(gtin, page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch(`http://trawl-fki.ostfalia.de/api/data/item/${gtin}?page=${page}&size=${pagesize}`, config); // Verwenden Sie die gtin im API-Link
    const receipts = await response.json();
    return receipts;
}
async function fetchImageByUri(uri) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/' + uri, config);
    const image = await response.json();
    console.log(image);
    return image;
}

document.addEventListener('DOMContentLoaded', async () => {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const searchParams = new URLSearchParams(window.location.search);
    const searchParam = searchParams.get('gtin');
    const ids = ["name", "description", "gtin", "product", "value", "unit", "producer", "image"];
    const store = await fetchItemByGtin(searchParam);
    console.log(await fetchReceipts(searchParam, 0,10));
    const receipts = await fetchReceipts(searchParam, 0, 10);
    totalPages = receipts.info.totalPages;
    let i = 0;

    document.getElementById(ids[i++]).textContent = store.name;
    document.getElementById(ids[i++]).textContent = store.description;
    document.getElementById(ids[i++]).textContent = store.gtin;
    document.getElementById(ids[i++]).textContent = store.product;
    document.getElementById(ids[i++]).textContent = store.quantity.value;
    document.getElementById(ids[i++]).textContent = store.quantity.unit;
    document.getElementById(ids[i++]).textContent = store.producer;
    const img = fetchImageByUri(store.image);
    console.log(img);
    document.getElementById(ids[i++]).textContent = img;
    displayPreis(receipts);
    updatePaginationLabel();
    updateButtons();

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            displayPreis(await fetchReceipts(searchParam, currentPage, 10));
            updatePaginationLabel();
            updateButtons();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < receipts.info.totalPages - 1) {
            currentPage++;
            displayPreis(await fetchReceipts(searchParam, currentPage, 10));
            updatePaginationLabel();
            updateButtons();
        }
    });
    document.getElementById("backArticles").addEventListener("click", async () => {
        window.location.href = 'Article.html';
    })
    function updateButtons(){
        if(currentPage === 0){
            prevButton.classList.add('disabled');
            prevButton.disabled = true;
        } else {
            prevButton.classList.remove('disabled');
            prevButton.disabled = false;
        }
    
        if(currentPage === receipts.info.totalPages -1) {
            nextButton.classList.add('disabled');
            nextButton.disabled = true;
        } else {
            nextButton.classList.remove('disabled');
            nextButton.disabled = false;
        }
    }
});

function displayPreis(receipts){
    var tbody = document.querySelector('#preise tbody');
    tbody.innerHTML = '';
    receipts.content.forEach(function(receipt) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${receipt.store}</td>
            <td>${receipt.price}</td>
        `;
        tbody.appendChild(row);
    });
}
function updatePaginationLabel() {
    document.querySelector('label').textContent = `Seite ${currentPage + 1} von ${totalPages}`;
}