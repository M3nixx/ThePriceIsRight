"use strict";

let currentPage = 0;
let totalPages = 0;

async function fetchReceipts(store, page, pagesize) {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        }
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data/store/' + store + '?page=' + page + '&size=' + pagesize, config);
    const receipts = await response.json();
    totalPages = receipts.info.totalPages;
    return receipts;
}
document.addEventListener('DOMContentLoaded', async () => {
        //Ihre Lösung hier
        const searchParams = new URLSearchParams(window.location.search);
        const searchParam = searchParams.get('id');
        const receipts = await fetchReceipts(searchParam, 0, 50);
        updatePaginationLabel();
        await displayReceiptsAsTable(receipts);

        document.getElementById("prev").addEventListener("click", async () => {
            if (currentPage > 0) {
              currentPage--;
              const searchParams = new URLSearchParams(window.location.search);
                const searchParam = searchParams.get('id');
              displayReceiptsAsTable(await fetchReceipts(searchParam, currentPage, 50));
              updatePaginationLabel();
            }
          });
        
          document.getElementById("next").addEventListener("click", async () => {
            if (currentPage < totalPages - 1) {
              currentPage++;
              const searchParams = new URLSearchParams(window.location.search);
                const searchParam = searchParams.get('id');
              displayReceiptsAsTable(await fetchReceipts(searchParam, currentPage, 50));
              updatePaginationLabel();
            }
          });
        
    });


async function displayReceiptsAsTable(receipts) {
    var tbody = document.querySelector('#receiptTable tbody');
  
    tbody.innerHTML = '';
    const uri = window.location.origin;
    const receiptList = [];
    const r = [];
    for(let i = 0;i<receipts.content.length;i++){
        if(r.length == 0){
            r.push(receipts.content[i]);
        }
        else if(receipts.content[i].time == r[0].time){
            r.push(receipts.content[i]);
        }
        else{
            receiptList.push(r.slice());
            r.length = 0;
            r.push(receipts.content[i]);
        }
    }
    console.log(receiptList);

    receiptList.forEach(function(receipt) {
      let sum = 0;
      receipt.forEach(function(product){sum += parseInt(product.price)});
      var row = document.createElement('tr');
      row.innerHTML = `
       <td>
            <a href="${uri}/StoreInfo.html?id=${receipt[0].store}">
                <div style="height:100%;width:100%">
                    ${receipt[0].store}
                </div>
            </a>
        </td>
        <td>${receipt.length}</td>
        <td>${sum}</td>
        <td>${receipt[0].time}</td>
      `;
      row.classList.add('highlighted-row');

      row.addEventListener('click', function () {
        window.location.href = 'ReceiptInfo.html?id=' + receipt[0].store + '&time=' + receipt[0].time;
      });

      tbody.appendChild(row);
    });

}

  function updatePaginationLabel() {
    document.querySelector('label').textContent = `Seite ${currentPage + 1}`;
  }
