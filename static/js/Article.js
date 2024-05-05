"use strict";

let currentPage = 0;

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
document.addEventListener('DOMContentLoaded', async () => {
    console.log(await fetchArticles(0, 30));
    const articles = await fetchArticles(0, 30);
    displayArticlesAsTable(await fetchArticles(currentPage, 30));
    updatePaginationLabel();

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            displayArticlesAsTable(await fetchArticles(currentPage, 30));
            updatePaginationLabel();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < articles.info.totalPages - 1) {
            currentPage++;
            displayArticlesAsTable(await fetchArticles(currentPage, 30));
            updatePaginationLabel();
        }
    });
});

function displayArticlesAsTable(articles) {
    var tbody = document.querySelector('#articleTable tbody');
    tbody.innerHTML = '';
    articles.content.forEach(function (article) {
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
    document.querySelector('label').textContent = `Seite ${currentPage + 1}`;
}