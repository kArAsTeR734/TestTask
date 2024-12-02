export let createOrderBtn = document.getElementById("newOrder");
export const modal = document.querySelector(".modal-overlay");
export const closeModalBtn = document.querySelector(".close-modal-btn");

export function openModal() {
    modal.classList.remove("hide");
}

export function closeModal(){
    modal.classList.add("hide");
}

export let change = document.getElementById("change");

export let confirm = document.getElementById("confirm");

closeModalBtn.addEventListener("click", closeModal)

createOrderBtn.addEventListener("click", openModal);


