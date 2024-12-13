const countOfItems = document.getElementById('counter')
const countText = document.querySelector('.item_count')

export function getCount(){
    const tbody = document.querySelector('#tbody');
    const rows = tbody.querySelectorAll("tr[data-id]");

    countOfItems.textContent = (rows.length+1).toString();

    if(countOfItems.innerText === '1')
        countText.innerText = countOfItems.innerText+' единица';
    else if(countOfItems.innerText === '2' || countOfItems.innerText === '3' || countOfItems.innerText === '4')
        countText.innerText = countOfItems.innerText+' единицы';
    else
        countText.innerText = countOfItems.innerText+' единиц';
}


