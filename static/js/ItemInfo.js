"use strict";

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
});