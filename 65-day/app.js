const todo = document.getElementById('new-todo');

var app = new Reef('#app', {
    data: {
        todos: []
    },
    template: (props) => {
        if(props.todos.length < 1){
            console.log('nada');
            return "There is nothing in the list."
        };
        
        return '<ul class="todos">' + props.todos.map((el, i) => {
            let item = '<li>' +
                        '<input data-id="' + i + '" id="todo-' + i + '" type="checkbox">' +
                        '<label for="todo-' + i + '">' + el.item + '</label>' + 
                        '<button class="delete" delete-id ="' + i + '">Delete</button>' +
                        '</li>';
            return item;
    }).join('') + `</ul>`;
  }
});

const addData = () => {
    let todos = app.getData().todos;
    let dupCheck = () =>{
        let dup = false;
        todos.map(obj => {
            if(obj.item == todo.value){
                dup = true;
                return dup;
            }
        })
        return dup;
    };

    event.preventDefault();

    // BLANK ITEM CHECK
    if(!todo.value){
        console.log('No data');
        return;
    }
    
    // DUPLICATE ITEM CHECK
    if(dupCheck()){
        return;
    }
    else{
        todos.push({
            item: todo.value,
            completed: false
        });
        app.setData({todos: todos});
        todo.value = '';
        todo.focus();
    }
}

const completedTodo = (event) => {
    let id = event.target.getAttribute('data-id');
    let todos = app.getData().todos;
    // let check = event.target.checked;

    if(!todos) return;
    if(!id) return;

    todos[id].completed = event.target.checked;
    app.setData({todos: todos})

    // if(check){
    //     event.target.classList.remove('unchecked');
    //     event.target.classList.add('checked');
    //     return;
    // }
    // else if(!check){
    //     event.target.classList.remove('checked');
    //     event.target.classList.add('unchecked');
    //     return;
    // }
}

const deleted = (event) => {
    let id = event.target.dataset.id;

    if(event.target.closest('.delete')){
        app.data.todos.splice(id, 1);
        app.render();
        return;
    }
}

const click = (event) => {
    completedTodo(event);
    deleted(event);
}

const saveTodos = () => localStorage.setItem('data', JSON.stringify(app.getData()));

const load = () => {
    let saved = localStorage.getItem('data');
    // set 'data' to a blank list in the event that 'data' is blank
    let data = saved ? JSON.parse(saved) : {
        todos: []
    };
    // render app with 'data'
    app.setData(data);
}
load();

window.addEventListener("submit", addData, false);
window.addEventListener("click", click, false);
window.addEventListener("render", saveTodos, false)
