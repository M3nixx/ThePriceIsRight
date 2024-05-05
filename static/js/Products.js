"use strict";

let currentPage = 0;

async function fetchProducts(page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/product/find?name=%25&page=' + page + '&size=' + pagesize, config);
    const products = await response.json();
    return products;
}
document.addEventListener('DOMContentLoaded', async () => {
    console.log(await fetchProducts(0, 30));
    const products = await fetchProducts(0, 30);
    displayProductsAsTable(await fetchProducts(currentPage, 30));
    updatePaginationLabel();
    console.log(currentPage);

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            displayProductsAsTable(await fetchProducts(currentPage, 30));
            updatePaginationLabel();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < products.info.totalPages - 1) {
            currentPage++;
            displayProductsAsTable(await fetchProducts(currentPage, 30));
            updatePaginationLabel();
        }
    });
});

function displayProductsAsTable(products) {
    var tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.content.forEach(function (product) {
        var row = document.createElement('tr');
        row.innerHTML = `
             <td>${product.name}</td>
             <td>${product.id}</td>
         `;
        row.classList.add('highlighted-row');
        tbody.appendChild(row);

        row.addEventListener('click', function () {
            window.location.href = 'ProductInfo.html?id=' + product.id;
        });
    });
}
function updatePaginationLabel() {
    document.querySelector('label').textContent = `Seite ${currentPage + 1}`;
}