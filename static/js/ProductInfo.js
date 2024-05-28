"use strict";

async function fetchProductById(id) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/product/' + id, config);
    const product = await response.json();
    return product;
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchParam = searchParams.get('id');
    const ids = ["name", "description", "id", "extended"];
    const product = await fetchProductById(searchParam);

    let i = 0;

    document.getElementById(ids[i++]).textContent = product.name;
    document.getElementById(ids[i++]).textContent = product.description;
    document.getElementById(ids[i++]).textContent = product.id;
    let categories = "";
    product.extended.forEach(element => {
        categories += element + ", ";
    });
    document.getElementById(ids[i++]).textContent = categories.slice(0, -2);

    document.getElementById("backProducts").addEventListener("click", async () => {
        window.location.href = 'Product.html';
    })
});