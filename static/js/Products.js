"use strict";

let currentPage = 0;
let totalPages = 0;
let suchQuery = '';
let suchFeld = 'name';

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

async function searchProducts(page, pagesize, suchFeld, suchQuery){
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch(`http://trawl-fki.ostfalia.de/api/product/find?${suchFeld}=${encodeURIComponent('%' + suchQuery + '%')}&page=${page}&size=${pagesize}`, config);
    const products = await response.json();
    return products
}

document.addEventListener('DOMContentLoaded', async () => {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const clearButton = document.getElementById('clearBtn');
    const searchInput = document.getElementById('sucheInput');
    clearButton.classList.add('disabled');
    clearButton.disabled = true;
    console.log(await fetchProducts(0, 30));
    const initialProducts = await fetchProducts(0, 30);
    totalPages = initialProducts.info.totalPages;
    displayProductsAsTable(initialProducts.content);
    updatePaginationLabel();
    updateButtons();

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            const products = suchQuery ? await searchProducts(currentPage, 30, suchFeld, suchQuery) : await fetchProducts(currentPage, 30);
            displayProductsAsTable(products.content);
            updatePaginationLabel();
            updateButtons();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < initialProducts.info.totalPages - 1) {
            currentPage++;
            const products = suchQuery ? await searchProducts(currentPage, 30, suchFeld, suchQuery) : await fetchProducts(currentPage, 30);
            displayProductsAsTable(products.content);
            updatePaginationLabel();
            updateButtons();
        }
    });
     // Event-Listener für den "Los"-Button registrieren
     const goToPageBtn = document.getElementById('goToPageBtn');
     goToPageBtn.addEventListener("click", async () => {
         const pageNumber = parseInt(pageInput.value, 10);
         if (pageNumber >= 1 && pageNumber <= totalPages) {
             currentPage = pageNumber - 1;
             const products = suchQuery ? await searchProducts(currentPage, 30, suchFeld, suchQuery) : await fetchProducts(currentPage, 30);
             displayProductsAsTable(products.content);
             updatePaginationLabel();
             updateButtons();
         } else {
             alert(`Bitte geben Sie eine Zahl zwischen 1 und ${totalPages} ein.`);
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
    
        if(currentPage === totalPages -1) {
            nextButton.classList.add('disabled');
            nextButton.disabled = true;
        } else {
            nextButton.classList.remove('disabled');
            nextButton.disabled = false;
        }
    }

    document.getElementById("suchButton").addEventListener('click', async () => {
        suchQuery = searchInput.value;
        currentPage = 0;
        const products = await searchProducts(currentPage, 30, suchFeld, suchQuery);
        totalPages = products.info.totalPages;
        displayProductsAsTable(products.content);
        updatePaginationLabel();
        updateButtons();
        clearButton.classList.remove('disabled');
        clearButton.disabled = false;
    })

    document.getElementById("backHome").addEventListener("click", async () => {
        window.location.href = 'HomePage.html';
    })

    document.getElementById("clearBtn").addEventListener("click", async () => {
        searchInput.value = '';
        suchQuery = '';
        currentPage = 0;
        const products = await fetchProducts(currentPage, 30);
        totalPages = products.info.totalPages;
        displayProductsAsTable(products.content);
        updateButtons();
        updatePaginationLabel();
        clearButton.classList.add('disabled');
        clearButton.disabled = true;
    })
});

function displayProductsAsTable(products) {
    var tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach(function (product) {
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
