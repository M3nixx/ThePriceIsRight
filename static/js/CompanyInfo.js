"use strict";

async function fetchCompanyByGln(gln) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/company/' + gln, config);
    const company = await response.json();
    return company;
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchParam = searchParams.get('gln');
    const ids = ["name", "description", "gln", "contact", "street", "city", "state", "zip", "country", "longitude", "latitude"];
    const company = await fetchCompanyByGln(searchParam);

    let i = 0;

    document.getElementById(ids[i++]).textContent = company.name;
    document.getElementById(ids[i++]).textContent = company.description;
    document.getElementById(ids[i++]).textContent = company.gln;
    document.getElementById(ids[i++]).textContent = company.location.address.contact;
    document.getElementById(ids[i++]).textContent = company.location.address.street;
    document.getElementById(ids[i++]).textContent = company.location.address.city;
    document.getElementById(ids[i++]).textContent = company.location.address.state;
    document.getElementById(ids[i++]).textContent = company.location.address.zip;
    document.getElementById(ids[i++]).textContent = company.location.address.country;
    document.getElementById(ids[i++]).textContent = company.location.longitude;
    document.getElementById(ids[i++]).textContent = company.location.latitude;

    document.getElementById("backCompanies").addEventListener("click", async () => {
        window.location.href = 'Company.html';
    })
});