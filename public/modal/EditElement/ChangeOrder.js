import {closeModalBtn, closeModal} from '../open-close-modal.js'
import {form,CreateItemBtn} from "../CreateElement/CreateOrder.js";
import {getAllUsers} from "../ReadElement/GetAllItems.js";
import {TakeOneUser} from "./GetUserById.js";
import {ValidateForm} from "../ValidateModalForm/FormValidate.js";

export const modalHeader = document.querySelector('#modal_header');
const changeItemBtn = document.querySelector("#tbody");
let currentItemId = null;

export function updateTable(id,data) {
    const row = changeItemBtn.querySelector(`tr[data-id="${id}"]`);
    if(row){
        console.log(row);
        console.log(row.querySelector("#itemTitle").textContent);
        row.querySelector("#itemTitle").textContent = data?.title;
        row.querySelector("#itemUnit").textContent =  data?.unit;
        row.querySelector("#itemCode").textContent = '#'+data?.code;
        row.querySelector("#itemDescription").textContent = data?.description;
    }
}

export async function getItemById(event){
    const pencilIcon = event.target.closest(".pencil-icon");
    if(!pencilIcon)
        return;
    const row = pencilIcon.closest("tr");
    if(row){
        const itemId = row.dataset.id;
        const item = await TakeOneUser(itemId);
        modalHeader.innerText = item.title;
        currentItemId = item.id;
    }
}

let newItem = {};

export function currentFormData(object){
    form.elements.title.value = object?.title;
    form.elements.unit.value = object?.unit;
    form.elements.code.value = object?.code;
    form.elements.description.value = object?.description;
}

export async function editUser(event) {
    event.preventDefault();
    const isFormDataValid = ValidateForm(event);
    if(!isFormDataValid)
        return;

    const formData = new FormData(form);
    const id = currentItemId;
    console.log(id);
    const data = {id:id,};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const response = await fetch(`api/wh/items/${id}/`, {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'Authorization':'Bearer '+localStorage.getItem('token') },
        body: JSON.stringify(data)
    });

    if (response.ok === true) {
        newItem = await response.json();
        updateTable(currentItemId,newItem);
        currentFormData(newItem);
        modalHeader.innerText = newItem.title;
    }
}


export const changeInput = document.getElementById("change")

closeModalBtn.addEventListener("click", closeModal);

changeItemBtn.addEventListener('click',getItemById);
changeItemBtn.addEventListener('click',()=>{
    CreateItemBtn.classList.add('hide');
    changeInput.classList.remove('hide');
})
changeInput.addEventListener('click',editUser);

document.addEventListener('DOMContentLoaded', getAllUsers);




