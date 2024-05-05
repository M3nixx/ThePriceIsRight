"use strict";

async function fetchReceipts(page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data/item/1023690557719?page=' + page + '&size=' + pagesize, config);
    const receipts = await response.json();
    return receipts;
}
document.addEventListener('DOMContentLoaded', async () => {
        //Ihre Lösung hier
        console.log(await fetchReceipts(0, 50));
        const receipts = await fetchReceipts(0, 50);
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
                <div style="height:100%;width:100%">
                    ${receipt.item}
                </div>
            </a>
        </td>
        <td>${receipt.number}</td>
        <td>${receipt.price}</td>
        <td>
            <a href="${uri}/StoreInfo.html?id=${receipt.store}">
                <div style="height:100%;width:100%">
                    ${receipt.store}
                </div>
            </a>
        </td>
        <td>${receipt.time}</td>
      `;
      row.classList.add('highlighted-row');
      tbody.appendChild(row);
    });

}


