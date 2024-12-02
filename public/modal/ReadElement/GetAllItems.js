import {CreateRow} from "../CreateElement/CreateOrder.js";

export async function TakeUsers(){
    const response = await fetch('api/wh/items',{
        method: 'GET',
        headers: {'Content-Type': 'application/json','Accept': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')}
    });
    if(response.ok){
        const items  = await response.json();
        return items;
    }
}

export async function getAllUsers() {
    let items = await TakeUsers();
    items.forEach(item => {
        document.querySelector("tbody").append(CreateRow(item));
    })
}
export async function Redirect(){
    window.location = 'http://localhost:3000/items';
}

