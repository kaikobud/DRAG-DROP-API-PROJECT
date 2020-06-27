const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const bestGames = [
  "Half-Life 2",
  "Grand Theft Auto V",
  "The Orange Box",
  "Half-Life",
  "BioShock",
  "Baldur's Gate II: Shadows of Amn",
  "Portal 2",
  "The Elder Scrolls V: Skyrim",
  "Mass Effect 2",
  "Grand Theft Auto: Vice City",
];

const listitems = [];

let dragStartIndex;

createList();

//when we need to return array of "object" using map,
// we can not write that way -> map(a => {name:a, age:'12'}) if we only wrap using
//second brakets then js will think that, its a start of a funtion block but we don't use
//this as a function block,
// we need to add extra parentheses -> map(a => ({name:a, age:'12'}))
//

function createList() {
  [...bestGames]
    .map((a, i) => ({ value: a, index: i, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach((game, i) => {
      const listitem = document.createElement("li");
      listitem.setAttribute("data-index", i);

      listitem.innerHTML = `
        <span class="number">${i + 1}</span>  
        <div class="draggable" draggable="true">
        <img class="game-image" src="img/${game.index + 1}.jpg">
        <p class="game-name">${game.value}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;
      listitems.push(listitem);
      draggable_list.appendChild(listitem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log("drag start");
  //we use closest as this dragstart event which is occured inside of a list item(in a div with draggable class), that's why we need to grab list item using closest to get the value of  data-index attribute, data-index attribute is in list item, not in the inside div with draggable class.
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  // console.log("drag enter");
  this.classList.add("over");
}
function dragLeave() {
  // console.log("drag leave");
  this.classList.remove("over");
}
function dragOver(e) {
  // console.log("drag over");
  e.preventDefault();
}
function dragDrop() {
  // console.log("drag drop");
  // here we don't need to use closest as this event is tiggered in a list item
  dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(from, to) {
  const itemOne = listitems[from].querySelector(".draggable");
  const itemTwo = listitems[to].querySelector(".draggable");
  listitems[from].appendChild(itemTwo);
  listitems[to].appendChild(itemOne);
  console.log(listitems[0]);
}

function checkOrder() {
  listitems.forEach((listitem, index) => {
    const name = listitem.querySelector(".draggable").innerText.trim();

    if (name !== bestGames[index]) {
      listitem.classList.add("wrong");
    } else {
      listitem.classList.remove("wrong");
      listitem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItem.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
