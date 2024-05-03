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
    const ids = ["name", "description", "id", "contact", "street", "city", "state", "zip", "country", "longitude", "latitude", "company"];
    const stores = await fetchStores(0, 50);
    const store = stores.content[0];

    let i = 0;

    document.getElementById(ids[i++]).textContent = store.name;
    document.getElementById(ids[i++]).textContent = store.description;
    document.getElementById(ids[i++]).textContent = store.id;
    document.getElementById(ids[i++]).textContent = store.location.address.contact;
    document.getElementById(ids[i++]).textContent = store.location.address.street;
    document.getElementById(ids[i++]).textContent = store.location.address.city;
    document.getElementById(ids[i++]).textContent = store.location.address.state;
    document.getElementById(ids[i++]).textContent = store.location.address.zip;
    document.getElementById(ids[i++]).textContent = store.location.address.country;
    document.getElementById(ids[i++]).textContent = store.location.longitude;
    document.getElementById(ids[i++]).textContent = store.location.latitude;
    document.getElementById(ids[i++]).textContent = store.company;
});