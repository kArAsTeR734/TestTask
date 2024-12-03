import { TakeUsers} from "../modal/ReadElement/GetAllItems.js";
import {CreateRow} from "../modal/CreateElement/CreateOrder.js";

const sortType = document.querySelector('#sortType');
const itemTable = document.getElementById('product');

export async function SortItemList(){
    const selectedValue = sortType.value;
    console.log(selectedValue);
    const items = await TakeUsers();
    switch (selectedValue){
        case 'ASC':
            const ascSortedItemsList = items.sort(((a, b) => a['title'].toLowerCase > b['title'].toLowerCase ? 1 : -1));
            console.log(ascSortedItemsList);
            return ascSortedItemsList;
        case 'DESC':
            const descSortedItemsList = items.sort(((a, b) => a['title'].toLowerCase > b['title'].toLowerCase ? -1 : 1));
            console.log(descSortedItemsList);
            return descSortedItemsList;
    }
}

export async function UpdateTable(){
    const sortedItemsList = await SortItemList();
    console.log(sortedItemsList);
    while (itemTable.rows.length > 1){
        itemTable.deleteRow(1);
    }
    sortedItemsList.forEach(item => {
        document.querySelector("tbody").append(CreateRow(item));
    })
}

sortType.addEventListener('change',UpdateTable);