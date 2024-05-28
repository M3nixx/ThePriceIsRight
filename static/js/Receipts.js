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
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const searchParams = new URLSearchParams(window.location.search);
        const searchParam = searchParams.get('id');
        const receipts = await fetchReceipts(searchParam, 0, 50);
        totalPages = receipts.info.totalPages;
        updatePaginationLabel();
        updateButtons();
        await displayReceiptsAsTable(receipts);

        document.getElementById("prev").addEventListener("click", async () => {
            if (currentPage > 0) {
              currentPage--;
              const searchParams = new URLSearchParams(window.location.search);
                const searchParam = searchParams.get('id');
              displayReceiptsAsTable(await fetchReceipts(searchParam, currentPage, 50));
              updatePaginationLabel();
              updateButtons();
            }
          });
        
          document.getElementById("next").addEventListener("click", async () => {
            if (currentPage < totalPages - 1) {
              currentPage++;
              const searchParams = new URLSearchParams(window.location.search);
                const searchParam = searchParams.get('id');
              displayReceiptsAsTable(await fetchReceipts(searchParam, currentPage, 50));
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
        document.getElementById("backStoreInfo").addEventListener("click", async () => {
          window.location.href = 'StoreInfo.html?id=' + receipts.content[0].store;
      })
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
    document.querySelector('label').textContent = `Seite ${currentPage + 1} von ${totalPages}`;
  }
