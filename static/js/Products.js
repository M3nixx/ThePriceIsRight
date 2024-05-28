"use strict";

let currentPage = 0;
let totalPages = 0;

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
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    console.log(await fetchProducts(0, 30));
    const products = await fetchProducts(0, 30);
    totalPages = products.info.totalPages;
    displayProductsAsTable(await fetchProducts(currentPage, 30));
    updatePaginationLabel();
    updateButtons();
   

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            displayProductsAsTable(await fetchProducts(currentPage, 30));
            updatePaginationLabel();
            updateButtons();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < products.info.totalPages - 1) {
            currentPage++;
            displayProductsAsTable(await fetchProducts(currentPage, 30));
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
    
        if(currentPage === products.info.totalPages -1) {
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
    document.querySelector('label').textContent = `Seite ${currentPage + 1} von ${totalPages}`;
}
