// ****** SELECT ITEMS **********
const alertContainer = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
// Load items
window.addEventListener('DOMContentLoaded', setupItems);
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const newItem = grocery.value;
    const id = new Date().getTime().toString();
    if(newItem && !editFlag){
        createListItems(id, newItem);
        // display alert
        displayAlert("Item added to the list", 'success');
        // show container
        container.classList.add('show-container');
        // set back to default
        setBackToDefault();
        // add to local storage
        addToLocalStorage(id,newItem);
    }
    else if(newItem && editFlag){
        editElement.innerHTML = newItem;

        displayAlert("item edited", 'success');
        // edit local storage
        editFromLocalStorage(editID, newItem);

        setBackToDefault();
    }
    else{
        displayAlert('please enter value', 'danger')
    }
}
// display alert
function displayAlert(text, action){
    alertContainer.textContent = text;
    alertContainer.classList.add(`alert-${action}`);
    
    // remove alert
    setTimeout(function(){
        alertContainer.textContent = '';
        alertContainer.classList.remove(`alert-${action}`);
    }, 1000)
}
// clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}
// edit item
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}
// delete item
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    list.removeChild(element);
    const id = element.dataset.id;
    if(list.children.length === 0){
        container.classList.remove('show-container');
    };
    displayAlert("item removed", 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}
// set back to default
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    updateLocalStorage(items)
}
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    })
    updateLocalStorage(items)
}
function editFromLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
        else{
            item.value = value;
            return item;
        }
    });
    updateLocalStorage(items)
}
function updateLocalStorage(items){
    localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
}
// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createListItems(item.id, item.value);
        });
        container.classList.add('show-container');
    }
}
function createListItems(id, newItem){
        const element = document.createElement('article');
        element.classList.add('grocery-item');

        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);

        element.innerHTML = `<p class="title">${newItem}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

        const editBtn = element.querySelector('.edit-btn');
        const deleteBtn = element.querySelector('.delete-btn');

        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        list.appendChild(element);
}