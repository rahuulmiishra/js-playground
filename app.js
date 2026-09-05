/*

1. Container
2. Text Field
3. Button
4. List (List Items)
5. Delete Edit Buttons

*/
let todos = [];
const allDivs = document.getElementsByTagName("div");
const appUsingQA = document.querySelectorAll("div");
const todoContainer = createElement('div');

todoContainer.addEventListener("click",function(event){
   const elem = event.target;
   if(elem.dataset.toDeleteIdx) {
        const idx = Number(elem.dataset.toDeleteIdx);
           const newTodos = todos.filter((_, i) => i != idx);
           todos = newTodos;
           renderTodos();
   }
})
todoContainer.style.height='200px';
todoContainer.style.width = '500px';
todoContainer.style.overflow = 'auto';
todoContainer.style.backgroundColor = 'red';

const textField = createElement('input');
textField.id = 'todoText';

const addTodoButton = createElement("button");
const todoList = createElement("ul");
todoList.id = 'todoList';
addTodoButton.innerText = "Add Todo";


addTodoButton.addEventListener('click', function(){
   const todo = document.getElementById('todoText').value;
   if(todo.length) {
      todos.push(todo);
      document.getElementById("todoText").value = "";
      renderTodos();
   } else {
    alert('Enter something');
   }
})

function renderTodos() {
    todoList.innerHTML = '';
    const temp = document.createDocumentFragment();
    for(let i=0;i<todos.length;i++){
        const todo = todos[i];

        const li = createElement('li');
        const template = document.getElementsByTagName('template')[0];
        const deleteUI = template.content.querySelector('div');
        const newDeleteUI = document.importNode(deleteUI, true);
        newDeleteUI.querySelector("input").style.display = 'none';
        newDeleteUI.querySelector('span').innerText = todo;
        newDeleteUI.querySelector("span").setAttribute('data-to-delete-idx', i);

        newDeleteUI.querySelector("button").setAttribute('data-delete-todo-id', i);
          newDeleteUI.querySelector("button").addEventListener('click',function(event) {
                const indexToDelete = Number(
                  event.target.getAttribute("data-delete-todo-id"),
                );
                const newTodos = todos.filter((_,i)=> i != indexToDelete);
                todos = newTodos;
                renderTodos();
          });

           newDeleteUI
             .querySelectorAll("button")[1]
             .addEventListener("click", function () {
                const idx = i;
                const list = document.getElementById('todoList');
                const todosLi = list.querySelectorAll('li');
                const toDoToEdit = todosLi[idx];
                console.log(toDoToEdit);
                toDoToEdit.querySelector('span').style.display = 'none';
                toDoToEdit.querySelector("input").value =
                  toDoToEdit.querySelector("span").textContent;
                toDoToEdit.querySelector("input").style.display = "block";


                toDoToEdit.querySelector("input").addEventListener('keypress', function(event ){
                        if(event.key === 'Enter') {
                           const newTodo = toDoToEdit.querySelector("input").value;
                        
                           todos[idx] = newTodo;
                          console.log(todos);
                           renderTodos();

                                 toDoToEdit.querySelector(
                                   "span",
                                 ).style.display = "block";
                                
                                 toDoToEdit.querySelector(
                                   "input",
                                 ).style.display = "none";
                        }
                })

             });
        li.append(newDeleteUI);
        temp.prepend(li);
    }
    todoList.append(temp);
}


const app = document.getElementById('root');


app.append(todoContainer);
todoContainer.append(textField)
todoContainer.append(addTodoButton);

todoContainer.append(todoList);




console.log(allDivs, appUsingQA);



function createElement(type) {
   const elem = document.createElement(type);
   return elem;
}

