import {CreateRow} from "../modal/CreateElement/CreateOrder.js";
import {getAllUsers} from "../modal/ReadElement/GetAllItems.js";

const searchBtn = document.getElementById("searchBtn");
const keyField = document.getElementById("search");
const itemTable = document.getElementById('product');

async function TakeItemByName(){
    const title = keyField.value.trim();
    if(title === '')
        return;

    window.history.pushState({},'',`/items/${title}`);
    console.log(title);
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(`http://localhost:3000/api/wh/itemsName/${encodedTitle}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json','Accept': 'application/json'}
    });

    if(response.ok){
        const item  = await response.json();
        return item
    }
    else{
        console.log('Ошибка на клиенте');
        console.error('Ошибка:', response.statusText);
    }
}

export async function ShowItem(){
    const item = await TakeItemByName();
    if(!item)
        return;
    //Чистим таблицу
    while (itemTable.rows.length > 1){
        itemTable.deleteRow(1);
    }
    //Добавляем полученный элемент
    document.querySelector("tbody").append(CreateRow(item));
}
searchBtn.addEventListener("click", ShowItem);

window.addEventListener('popstate',async ()=>{
    if(keyField.value === '')
        return;
    const currentPath = window.location.pathname;

    while (itemTable.rows.length > 1){
        itemTable.deleteRow(1);
    }

    if(currentPath === '/items'){
        keyField.value = '';
        await getAllUsers();
    }
    const match = currentPath.match(/^\/items\/(.+)$/);
    console.log(currentPath);
    if(match){
        await ShowItem();
    }
})
