const itemForm = document.getElementById("addItem");
const addItemBtn = document.getElementById('addItem');

const titleField = document.getElementById('title');
const unitField = document.getElementById('unit');
const codeField = document.getElementById('code');
const descriptionField = document.getElementById('description');
export let isItemValid;

export function ValidateForm(event){
    isItemValid = false
    const titleValid = ValidateTitle(event);
    const unitValid = ValidateUnit(event);
    const codeValid = ValidateCode(event);
    if(!event.target.classList.contains('confirm_btn') || event.target.classList.contains('change_btn'))
        return;
    console.log(titleValid);
    console.log(unitValid);
    if(!titleValid || !unitValid || !codeValid)
        return isItemValid;

    isItemValid = true;
    alert('Отправка разрешена');

    return isItemValid;
}

export function ValidateTitle(event){
    let isTitleValid = false;

    const titleErrors = document.getElementById('titleErrors');
    const titleValue = titleField.value;
    if(titleValue.length < 3){
        event.preventDefault();
        titleErrors.textContent = titleField.validationMessage;
        titleErrors.style.display = "block";
    }
    else{
        titleErrors.textContent = "";
        titleErrors.style.display = "none";
        isTitleValid = true;
    }
    return isTitleValid;
}

export function ValidateUnit(event){
    let isUnitValid = false;
    const unitErrors = document.getElementById('unitErrors');
    const unitValue = unitField.value;
    if(unitValue.length !== 2){
        event.preventDefault();
        unitErrors.textContent = unitField.validationMessage;
        unitErrors.style.display = "block";
    }
    else if((unitValue!=='кг' && unitValue!=='шт')) {
        event.preventDefault();
        unitField.setCustomValidity("Укажите верную единицу измерения (кг или шт)");
        unitErrors.textContent = unitField.validationMessage;
        unitErrors.style.display = "block";
    }
        else{
        unitErrors.textContent = "";
        unitField.valid = true
        unitErrors.style.display = "none";
        isUnitValid = true;
    }
    return isUnitValid;
}

export function ValidateCode(event){
    let isCodeValid = false;

    const codeErrors = document.getElementById('codeErrors');
    const codeValue = codeField.value;
    if(!codeValue.match(/([0-9]{7})/)){
        event.preventDefault();
        codeField.setCustomValidity("Укажите данные в формате 1234567");
        codeErrors.textContent = codeField.validationMessage;
        codeErrors.style.display = "block";
    }
    else{
        codeErrors.textContent = "";
        codeErrors.style.display = "none";
        isCodeValid = true;
    }
    return isCodeValid;
}

