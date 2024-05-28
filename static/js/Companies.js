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
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    console.log(await fetchCompanies(0, 30));
    const companies = await fetchCompanies(0, 30);
    displayCompaniesAsTable(await fetchCompanies(currentPage, 30));
    updatePaginationLabel();
    updateButtons();

    document.getElementById("prev").addEventListener("click", async () => {
        if (currentPage > 0) {
            currentPage--;
            displayCompaniesAsTable(await fetchCompanies(currentPage, 30));
            updatePaginationLabel();
            updateButtons();
        }
    });

    document.getElementById("next").addEventListener("click", async () => {
        if (currentPage < companies.info.totalPages - 1) {
            currentPage++;
            displayCompaniesAsTable(await fetchCompanies(currentPage, 30));
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
    
        if(currentPage === companies.info.totalPages -1) {
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