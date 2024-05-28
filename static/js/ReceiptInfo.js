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
async function deleteReceipt(time, store, item) {
    const config = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data?time=' + time + '&store=' + store + '&item=' + item, config);
  }
document.addEventListener('DOMContentLoaded', async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const searchParamId = searchParams.get('id');
        const searchParamTime = searchParams.get('time');
        const receipts = await fetchReceipts(searchParamId, searchParamTime , 0, 50);
        displayReceiptsAsTable(receipts);

        document.getElementById("backReceipts").addEventListener("click", async () => {
            window.location.href = 'Receipts.html?id=' + receipts.content[0].store;
        })
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
        <td>${(receipt.price / 100).toFixed(2)} €</td>
        <td>
            <a href="${uri}/StoreInfo.html?id=${receipt.store}">
                ${receipt.store}
            </a>
        </td>
        <td>${receipt.time}</td>
        <td>${receipt.special ? 'Ja' : 'Nein'}</td>
        <td>${receipt.soldOut ? 'Ja' : 'Nein'}</td>
        <td><button class="button" onclick="deleteReceipt('${receipt.time}', '${receipt.store}', '${receipt.item}')">Löschen</button></td>
      `;
      row.classList.add('highlighted-row');
      tbody.appendChild(row);
    });

}


