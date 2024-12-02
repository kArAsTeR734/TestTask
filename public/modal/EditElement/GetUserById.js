import {currentFormData} from "./ChangeOrder.js";

export async function TakeOneUser(id){
    const response = await fetch(`api/wh/items/${id}/`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json','Accept': 'application/json','Authorization':'Bearer '+localStorage.getItem('token')}
    });
    if(response.ok){
        const item  = await response.json();
        currentFormData(item);
        return item
    }
    else{
        console.error('Ошибка:', response.statusText);
    }
}

