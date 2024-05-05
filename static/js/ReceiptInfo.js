"use strict";

async function fetchReceipts(store, time, page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data/store/' + store + '?page=' + page + '&size=' + pagesize + '&from=' + time + '&to=' + time, config);
    const receipts = await response.json();
    return receipts;
}
document.addEventListener('DOMContentLoaded', async () => {
        //Ihre Lösung hier
        const searchParams = new URLSearchParams(window.location.search);
        const searchParamId = searchParams.get('id');
        const searchParamTime = searchParams.get('time');
        const receipts = await fetchReceipts(searchParamId, searchParamTime , 0, 50);
        displayReceiptsAsTable(receipts);
    });


function displayReceiptsAsTable(receipts) {
    var tbody = document.querySelector('#receiptTable tbody');
  
    tbody.innerHTML = '';
    const uri = window.location.origin;
    receipts.content.forEach(function(receipt) {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>
            <a href="${uri}/ItemInfo.html?gtin=${receipt.item}">
                ${receipt.item}
            </a>
        </td>
        <td>${receipt.number}</td>
        <td>${receipt.price}</td>
        <td>
            <a href="${uri}/StoreInfo.html?id=${receipt.store}">
                ${receipt.store}
            </a>
        </td>
        <td>${receipt.time}</td>
      `;
      row.classList.add('highlighted-row');
      tbody.appendChild(row);
    });

}


