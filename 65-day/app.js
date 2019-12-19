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
                "<li" + (el.completed ? 'class="todo-completed' : '') + ">" +
                    "<label for='todo-" + i + ">" + 
                        `<input id="todo-` + i +`" type="checkbox"` + (el.completed ? 'checked' : '') + `>` + el.item +
                `</label>`;
            return item;
    }).join('') + `</ul>`;
  }
});

const list = app.data.todos;
const val = todo.value;

const addData = () => {
    event.preventDefault();
    if(!todo) {
        console.log('not todo')
        return;
    }
    if(!todo.value){
        console.log('No data');
        return;
    }

    let dupCheck = (el) => el === val;
    
    if(list.some(dupCheck)){
        console.log('duplicate item')
        return;
    }

    list.push(todo.value);
    todo.value = '';
    todo.focus();
    app.render();
}

app.render()

window.addEventListener("submit", addData, false)