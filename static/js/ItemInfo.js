"use strict";

let currentPage = 0;
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
    const response = await fetch('http://trawl-fki.ostfalia.de/api/' + uri, config);
    const item = await response.json();
    return item;
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchParam = searchParams.get('gtin');
    const ids = ["name", "description", "gtin", "product", "value", "unit", "producer", "image"];
    const store = await fetchItemByGtin(searchParam);
    console.log(await fetchReceipts(searchParam, 0,10));
    const receipts = await fetchReceipts(searchParam, 0, 10);
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
    document.getElementById(ids[i++]).textContent = store.image;
    displayPreis(receipts);
    updatePaginationLabel();

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            displayPreis(await fetchReceipts(searchParam, currentPage, 10));
            updatePaginationLabel();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < receipts.info.totalPages - 1) {
            currentPage++;
            displayPreis(await fetchReceipts(searchParam, currentPage, 10));
            updatePaginationLabel();
        }
    });
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
    document.querySelector('label').textContent = `Seite ${currentPage + 1}`;
}