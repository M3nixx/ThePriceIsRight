"use strict";

let currentPage = 0;

async function fetchCompanies(page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/company/find?name=%25&page=' + page + '&size=' + pagesize, config);
    const companies = await response.json();
    return companies;
}
document.addEventListener('DOMContentLoaded', async () => {
    console.log(await fetchCompanies(0, 30));
    const companies = await fetchCompanies(0, 30);
    displayCompaniesAsTable(await fetchCompanies(currentPage, 30));
    updatePaginationLabel();

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            displayCompaniesAsTable(await fetchCompanies(currentPage, 30));
            updatePaginationLabel();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < company.info.totalPages - 1) {
            currentPage++;
            displayCompaniesAsTable(await fetchCompanies(currentPage, 30));
            updatePaginationLabel();
        }
    });
});

function displayCompaniesAsTable(companies) {
    var tbody = document.querySelector('#companyTable tbody');
    tbody.innerHTML = '';
    companies.content.forEach(function (company) {
        var row = document.createElement('tr');
        row.innerHTML = `
             <td>${company.name}</td>
             <td>${company.gln}</td>
         `;
        row.classList.add('highlighted-row');
        tbody.appendChild(row);

        row.addEventListener('click', function () {
            window.location.href = 'CompanyInfo.html?gln=' + company.gln;
        });
    });
}
function updatePaginationLabel() {
    document.querySelector('label').textContent = `Seite ${currentPage + 1}`;
}