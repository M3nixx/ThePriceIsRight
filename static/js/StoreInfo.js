"use strict";

async function fetchStoreById(id) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/store/' + id, config);
    const store = await response.json();
    return store;
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchParam = searchParams.get('id');
    const ids = ["name", "description", "id", "contact", "street", "city", "state", "zip", "country", "longitude", "latitude", "company"];
    const store = await fetchStoreById(searchParam);
    console.log(store);
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

    const receiptbtn = document.getElementById("receiptbtn");
    receiptbtn.addEventListener('click', function () {
        window.location.href = 'Receipts.html?id=' + store.id;
      });
      document.getElementById("backStores").addEventListener("click", async () => {
        window.location.href = 'Stores.html';
    })
    document.getElementById("company").addEventListener("click", async () => {
        window.location.href = 'CompanyInfo.html?gln=' + store.company;
    })
});