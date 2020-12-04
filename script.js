const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
const bgChange = document.querySelector("#bgChange");
const bgChange2 = document.querySelector("#header");
const btnchangecolor = document.querySelector("#btnAddNewTask");
let items;

loadItems();

eventListeners();

function eventListeners() {
  //submit event
  form.addEventListener("submit", addNewItem);

  //delete an item
  taskList.addEventListener("click", deleteItem);

  //delete all items
  btnDeleteAll.addEventListener("click", deleteAllItems);

  bgChange.addEventListener("click", bgChanger);
}

function loadItems(){
  items=getItemFromLS();
  items.forEach (function(item){
    createItem(item);
  })
}

function getItemFromLS(){
  if(localStorage.getItem('items')===null){
      items=[];
  }else{
      items= JSON.parse(localStorage.getItem('items'));
  }
  return items;
}

function setItemToLS(text){
    items= getItemFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteItemFromLS(text){
  items = getItemFromLS();
  items.forEach(function(item,index){
      if(item === text){
        items.splice(index,1)};
  });
  localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){

  //create li
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text)); // li tagına bir tane text bölümü ekledik.

  //create a
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  //add a to li
  li.appendChild(a); //Yukarıda oluşturduğumuz a yı li elementinin child elemanı olarak içerisine attık.

  taskList.appendChild(li); //tasklist yukarıda queryselector ile seçtiğimiz ul yi temsil ediyor. li yi ul'nin child elemanı yaptık burada.

}

function addNewItem(e) {
  if (input.value === "") {
    alert("Please Add New Item");
  }

  setItemToLS(input.value);

  createItem(input.value);
  //clearinput
  input.value = '';

  e.preventDefault(); //Sayfa submit olduğunda refresh etmesini engelliyor.Spa'lar için bulunmaz nimet.
}

function deleteItem(e) {
  
    if (e.target.className === "fas fa-times") {
      if (confirm("Are You Sure")) {
      e.target.parentElement.parentElement.remove();}

      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  
  e.preventDefault();
}

function deleteAllItems(e) {
  if (confirm("Are yuo Sure?")) {
         taskList.innerHTML = "";
    };
    localStorage.clear();
  e.preventDefault();
}
  
function bgChanger() {
  document.body.style.backgroundColor = "#202530";
  bgChange2.style.color = "white";
  btnchangecolor.className = "btn btn-warning";
  bgChange.className = "btn btn-warning m-2 float-right";
}

