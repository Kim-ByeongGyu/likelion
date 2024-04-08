let basicData = [
	{ id: 1, title: "Todo 1", done: false },
	{ id: 2, title: "Todo 2", done: true },
];

toDoList();

const addButton = document.getElementsByClassName("add-button")[0];
addButton.addEventListener("click", addList);

const inputText = document.querySelector(".input-text");

const lis = document.querySelectorAll("li");

// 각 <li> 요소에 클릭 이벤트 추가
lis.forEach((li) => {
  li.addEventListener("click", (event) => {
    event.stopPropagation();	// 전파 막기인데 .. 문제있음
    basicData.forEach((data) => {
      if (li.childNodes[0].textContent === data.title) {
        if (data.done) {
          data.done;
          li.style.textDecoration = "none";
          li.style.color = "black";
          data.done = false;
        } else {
          li.style.textDecoration = "line-through";
          li.style.color = "grey";
          data.done = true;
        }
      }
    });
  });
});

function toDoList() {
	let todoItemList = document.getElementById("todo-item-list");
	// 리스트를 한번 비워주기
	todoItemList.innerHTML = "";

	// 출력
	basicData.forEach(function (data) {
		let todoItem = document.createElement("li");
		todoItem.setAttribute("class", "todo-item");
		let textNode = document.createTextNode(data.title);
		todoItem.appendChild(textNode);
		let removeButton = document.createElement("button");
		removeButton.setAttribute("class", "remove");
		removeButton.textContent = "x";
		todoItem.appendChild(removeButton);
		todoItemList.appendChild(todoItem);
		if (data.done) {
		todoItem.style.textDecoration = "line-through";
		todoItem.style.color = "grey";
		}

		// x 버튼에 클릭 이벤트 추가
		removeButton.addEventListener("click", function (event) {
		event.preventDefault(); // 기본 동작 중지

		const listItem = this.parentElement;
		const itemText = listItem.childNodes[0].textContent;

		for (let j = 0; j < basicData.length; j++) {
			if (basicData[j].title === itemText) {
				basicData.splice(j, 1);
			}
		}

		toDoList();
		});
	});
}

// 추가
function addList() {
	const addValue = inputText.value;
	const newItem = { id: basicData.length + 1, title: addValue, done: false };

	basicData.push(newItem);
	inputText.value = "";
	toDoList();
}
