import {changeInput, modalHeader} from "../EditElement/ChangeOrder.js";
import {closeModal, openModal} from "../open-close-modal.js";
import {getCount} from "../../header/ItemCounter.js";
import {ValidateForm} from "../ValidateModalForm/FormValidate.js";

function reset() {
    form.reset();
    CreateItemBtn.classList.remove('hide');
    changeInput.classList.add('hide')
}
export function CreateRow(item) {
    if(!item)return ;
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", item.id);

    const titleTd = document.createElement("td");
    titleTd.append(item.title);
    titleTd.id = 'itemTitle';
    tr.append(titleTd);

    const unitTd = document.createElement("td");
    unitTd.append(item.unit);
    unitTd.id = 'itemUnit';
    tr.append(unitTd);

    const codeTd = document.createElement("td");
    codeTd.append('#' + item.code);
    codeTd.id='itemCode';
    tr.append(codeTd);

    const descriptionTd = document.createElement("td");
    descriptionTd.classList.add("hide");
    descriptionTd.append(item.description);
    descriptionTd.id='itemDescription';
    tr.append(descriptionTd);

    const idTd = document.createElement("td");
    idTd.classList.add("hide");
    idTd.append(item.id);
    idTd.id = "Id";
    tr.append(idTd);

    const iconTd = document.createElement("td");
    const iconDiv = document.createElement("div");
    const icon = document.createElement("img");

    icon.src = "/icons/pencil.png"
    iconTd.append(iconDiv);
    iconDiv.classList.add("icon");
    iconDiv.addEventListener('click',openModal);
    iconDiv.classList.add("pencil-icon");
    iconDiv.appendChild(icon);
    tr.append(iconTd);
    getCount();
    return tr;
}

export async function addUser(event) {
    event.preventDefault();
    const isFormDataValid = ValidateForm(event);
    console.log(isFormDataValid);
    if(!isFormDataValid)
        return;
    // Собираем данные из формы
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // Отправляем POST-запрос на сервер
        const response = await fetch('api/wh/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        reset();
        document.querySelector("tbody").append(CreateRow(result));
        closeModal();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Error: ' + error.message;
    }
}

export const form = document.getElementById('addItem')
export const CreateItemBtn = document.getElementById("create")
const newItemBtn = document.getElementById("newOrder");

newItemBtn.addEventListener('click',()=>modalHeader.innerText = 'Новая позиция');
newItemBtn.addEventListener('click',reset);

CreateItemBtn.addEventListener('click',addUser);
