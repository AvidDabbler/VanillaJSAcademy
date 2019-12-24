const todo = document.getElementById('new-todo');
let d;

var app = new Reef('#app', {
    data: {
        todos: []
    },
    template: (props) => {
        if(props.todos < 1){
            return "There is nothing in the list."
        };
        
        return '<ul class="todos">' + props.todos.map((el, i) => {
            let item = 
                '<label for="todo-' + i + '">' + 
                        '<input id="todo-' + i + '" type="checkbox">' + el +
                        '<button class="delete" data-id ="' + i + '">Delete</button>'
                    '</label>';
            return item;
    }).join('') + `</ul>`;
  }
});


const list = app.data.todos;
const val = todo.value;
const save = () => localStorage.setItem('data', JSON.stringify(list));


const addData = () => {
    d = Array.prototype.slice.call(document.querySelectorAll('.delete'));
    event.preventDefault();

    if(!todo) {
        console.log('not todo')
        return;
    }
    if(!todo.value){
        console.log('No data');
        return;
    }

    let dupCheck = (el) => el == todo.value;
    
    if(list.some(dupCheck)){
        console.log('duplicate item')
        return;
    }else{
        list.push(todo.value);
        todo.value = '';
        todo.focus();
    }
    d = Array.prototype.slice.call(document.querySelectorAll('.delete'));

    app.render();
    save();

}

const deleteItem = (event) => {
    if(!event.target.closest('.delete'))return;
    let delete_id = event.target.dataset.id;

    list.splice(delete_id, 1);
    app.render();
    save();

}
if(localStorage.getItem('data').length) {
    app.data.todos = JSON.parse(localStorage.getItem('data'));
}

app.render()

window.addEventListener("submit", addData, false)
window.addEventListener("click", deleteItem, false)