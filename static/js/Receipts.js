"use strict";

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
    return receipts;
}
document.addEventListener('DOMContentLoaded', async () => {
        //Ihre Lösung hier
        const searchParams = new URLSearchParams(window.location.search);
        const searchParam = searchParams.get('id');
        const receipts = await fetchReceipts(searchParam, 0, 50);
        displayReceiptsAsTable(receipts);
    });


function displayReceiptsAsTable(receipts) {
    var tbody = document.querySelector('#receiptTable tbody');
  
    tbody.innerHTML = '';
    const uri = window.location.origin;
    const receiptList = [];
    let r = [];
    for(let i = 0;i<receipts.content.length;i++){
        if(r.length == 0){
            r.push(receipts.content[i]);
        }
        else if(receipts.content[i].time == r[0].time){
            r.push(receipts.content[i]);
        }
        else{
            receiptList.push(r);
            r.length = 0;
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
      tbody.appendChild(row);
    });

}


