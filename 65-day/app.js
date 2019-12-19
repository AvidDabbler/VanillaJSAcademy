const todo = document.getElementById('new-todo');

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
                '</label>';
            return item;
    }).join('') + `</ul>`;
  }
});

const list = app.data.todos;
const val = todo.value;

const addData = () => {
    console.log(todo.value);
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

    app.render();

}

app.render()

window.addEventListener("submit", addData, false)