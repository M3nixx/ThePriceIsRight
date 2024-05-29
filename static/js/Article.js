"use strict";

let currentPage = 0;
let totalPages = 0;
let suchQuery = '';
let suchFeld = 'name';

async function fetchArticles(page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/item/find?name=%25&page=' + page + '&size=' + pagesize, config);
    const articles = await response.json();
    return articles;
}

async function searchArticles(page, pagesize, suchFeld, suchQuery) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch(`http://trawl-fki.ostfalia.de/api/item/find?${suchFeld}=${encodeURIComponent('%' + suchQuery + '%')}&page=${page}&size=${pagesize}`, config);
    const articles = await response.json();
    return articles
}

document.addEventListener('DOMContentLoaded', async () => {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const clearButton = document.getElementById('clearBtn');
    const searchInput = document.getElementById('sucheInput');
    clearButton.classList.add('disabled');
    clearButton.disabled = true;
    console.log(await fetchArticles(0, 30));
    const initialArticles = await fetchArticles(0, 30);
    totalPages = initialArticles.info.totalPages;
    displayArticlesAsTable(initialArticles.content);
    updatePaginationLabel();
    updateButtons();

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            const articles = suchQuery ? await searchArticles(currentPage, 30, suchFeld, suchQuery) : await fetchArticles(currentPage, 30);
            displayArticlesAsTable(articles.content);
            updatePaginationLabel();
            updateButtons();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < initialArticles.info.totalPages - 1) {
            currentPage++;
            const articles = suchQuery ? await searchArticles(currentPage, 30, suchFeld, suchQuery) : await fetchArticles(currentPage, 30);
            displayArticlesAsTable(articles.content);
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
        const articles = await searchArticles(currentPage, 30, suchFeld, suchQuery);
        totalPages = articles.info.totalPages;
        displayArticlesAsTable(articles.content);
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
        const articles = await fetchArticles(currentPage, 30);
        totalPages = articles.info.totalPages;
        displayArticlesAsTable(articles.content);
        updateButtons();
        updatePaginationLabel();
        clearButton.classList.add('disabled');
        clearButton.disabled = true;
    })
});

function displayArticlesAsTable(articles) {
    var tbody = document.querySelector('#articleTable tbody');
    tbody.innerHTML = '';
    articles.forEach(function (article) {
        var row = document.createElement('tr');
        row.innerHTML = `
             <td>${article.name}</td>
             <td>${article.gtin}</td>
         `;
        row.classList.add('highlighted-row');
        tbody.appendChild(row);

        row.addEventListener('click', function () {
            window.location.href = 'ItemInfo.html?gtin=' + article.gtin;
        });
    });
}
function updatePaginationLabel() {
    document.querySelector('label').textContent = `Seite ${currentPage + 1} von ${totalPages}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Andere Initialisierungen und Event-Listener hier

    // Event-Listener für den "Los"-Button registrieren
    const goToPageBtn = document.getElementById('goToPageBtn');
    goToPageBtn.addEventListener("click", async () => {
        const pageNumber = parseInt(pageInput.value, 10);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            currentPage = pageNumber - 1;
            const articles = suchQuery ? await searchArticles(currentPage, 30, suchFeld, suchQuery) : await fetchArticles(currentPage, 30);
            displayArticlesAsTable(articles.content);
            updatePaginationLabel();
        } else {
            alert(`Bitte geben Sie eine Zahl zwischen 1 und ${totalPages} ein.`);
        }
    });
});



