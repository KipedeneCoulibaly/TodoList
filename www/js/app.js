import { TodoList } from "./components/TodoList.js";
import { fetchJSON } from "./function/fetchJSON.js";
import { creatElement } from "./function/creatElement.js";

try {
    const todosInStorage = localStorage.getItem('todos')?.toString()
    let todos = []
    if(todosInStorage){
        todos = JSON.parse(todosInStorage)
    }else{
        todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    }
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#todolist'))
} catch (e) {
    const alertElement = creatElement('div', {
        class: 'alert alert-danger m-2',
        role: 'danger'
    })
    alertElement.innerText = 'Impossible to contact the server'
    document.body.prepend(alertElement)
    console.error(e)
}

