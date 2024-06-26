async function postReceipt(receipt){
    const config = {
        method: 'POST',
        headers: {
            'Content-Length': receipt,
            'Content-Type': 'application/json',
            'X-API-Key': 'afdb55d3-aa85-42c9-a2fc-fa3e378b04b5'
        },
        body: JSON.stringify(receipt)
    }
    const response = await fetch('http://trawl-fki.ostfalia.de/api/data', config);
    return response;
}

function addRow() {
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length;
    const row = table.insertRow(rowCount);

    const timeCell = row.insertCell(0);
    const timeInput = document.createElement('input');
    timeInput.type = 'text';
    timeInput.name = 'time[]';
    timeInput.required = true;
    timeCell.appendChild(timeInput);

    const storeCell = row.insertCell(1);
    const storeInput = document.createElement('input');
    storeInput.type = 'text';
    storeInput.name = 'store[]';
    storeInput.required = true;
    storeCell.appendChild(storeInput);

    const itemCell = row.insertCell(2);
    const itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.name = 'item[]';
    itemInput.required = true;
    itemCell.appendChild(itemInput);

    const numberCell = row.insertCell(3);
    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.name = 'number[]';
    numberInput.required = true;
    numberCell.appendChild(numberInput);

    const priceCell = row.insertCell(4);
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.step = '1';
    priceInput.name = 'price[]';
    priceInput.required = true;
    priceCell.appendChild(priceInput);

    const specialCell = row.insertCell(5);
    const specialInput = document.createElement('input');
    specialInput.type = 'checkbox';
    specialInput.name = 'special[]';
    specialInput.value = 'true';
    specialCell.appendChild(specialInput);

    const soldOutCell = row.insertCell(6);
    const soldOutInput = document.createElement('input');
    soldOutInput.type = 'checkbox';
    soldOutInput.name = 'soldOut[]';
    soldOutInput.value = 'true';
    soldOutCell.appendChild(soldOutInput);

    const removeCell = row.insertCell(7);
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.innerText = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.onclick = function() {
        table.deleteRow(row.rowIndex - 1);
    };
    removeCell.appendChild(removeButton);
}
async function handleSubmit(event) {
    event.preventDefault();
    const responsefield = document.getElementById('response');
    const form = event.target;
    const times = form.querySelectorAll('input[name="time[]"]');
    const stores = form.querySelectorAll('input[name="store[]"]');
    const items = form.querySelectorAll('input[name="item[]"]');
    const numbers = form.querySelectorAll('input[name="number[]"]');
    const prices = form.querySelectorAll('input[name="price[]"]');
    const specials = form.querySelectorAll('input[name="special[]"]');
    const soldOuts = form.querySelectorAll('input[name="soldOut[]"]');
    const receiptData = [];
    for (let i = 0; i < items.length; i++) {
        receiptData.push({
            time: times[i].value,
            store: stores[i].value,
            item: items[i].value,
            number: parseInt(numbers[i].value),
            price: parseFloat(prices[i].value),
            special: specials[i].checked,
            soldOut: soldOuts[i].checked
        });
    }

    for (let i = 0; i < receiptData.length; i++) {
        const response = await postReceipt(receiptData[i]);
        /*
        try {
            const response = await postReceipt(receiptData[i]);
            const responseJson = await response.json();
            responsefield.innerHTML += '<br>' + (i + 1) + ': ' + responseJson.code + ': ' + responseJson.message;
        } catch (error) {
            console.error('Error posting receipt:', error);
            responsefield.innerHTML += '<br>' + (i + 1) + ': Error posting receipt';
        }*/
    }       
}
document.getElementById("backHome").addEventListener("click", async () => {
    window.location.href = 'HomePage.html';
})