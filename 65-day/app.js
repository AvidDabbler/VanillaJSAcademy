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

const val = todo.value;

const update = () => {
    app.data.todos = JSON.parse(localStorage.getItem('data'));  
    console.log('update');
    app.render();
}

const list = () => app.data.todos;

const addData = () => {
    d = Array.prototype.slice.call(document.querySelectorAll('.delete'));
    event.preventDefault();

    // BLANK ITEM CHECK
    if(!todo.value){
        console.log('No data');
        return;
    }

    let dupCheck = list().some(el => el == todo.value);
    
    // DUPLICATE ITEM CHECK
    if(dupCheck){
        console.log('duplicate item')
        return;
    }else{
        app.data.todos.push(todo.value);
        localStorage.setItem('data', JSON.stringify(list()));
        todo.value = '';
        todo.focus();
    }
    update();
}

const deleteItem = (event) => {
    if(!event.target.closest('.delete'))return;
    let delete_id = event.target.dataset.id;

    app.data.todos.splice(delete_id, 1);
    localStorage.setItem('data', JSON.stringify(list()));
    app.render();
    console.log('delete')

}

const load = () => {
    event.preventDefault();
    app.data.todos = JSON.parse(localStorage.getItem('data'));
}
update();

window.addEventListener("submit", addData, false);
window.addEventListener("click", deleteItem, false);
window.addEventListener('load', load, false);
