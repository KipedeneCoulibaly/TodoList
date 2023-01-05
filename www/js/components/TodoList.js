import { creatElement } from "../function/creatElement.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoList {
    
    /**@type {Todo[]} */
    #todos = []
    
    /**@type {HTMLUListElement[]} */
    #listElement = []

    /**
     * @param {Todo[]} todos 
    */
    constructor(todos){
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element){
        element.innerHTML = `
        <form class="d-flex pb-4">
            <input class="form-control" type="text" placeholder="Send new year's greetings..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary"> Add </button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class="btn btn-outline-primary active" data-filter="all"> All </button>
                <button type="button" class="btn btn-outline-primary" data-filter="todo"> Todo </button>
                <button type="button" class="btn btn-outline-primary" data-filter="done"> Done </button>
            </div>

            <ul class="list-group">
                
            </ul>
        </main>`
        this.#listElement = element.querySelector('.list-group')
        for(let todo of this.#todos){
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)
        }

        element.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
        element.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', e => this.#toggleFilter(e))
        });

        this.#listElement.addEventListener('delete', ({detail: todo}) => {
            this.#todos = this.#todos.filter(t => t !== todo)
            this.#onUpdate()    
        })

        this.#listElement.addEventListener('toggle', ({detail: todo}) => {
            todo.completed = !todo.completed
            this.#onUpdate()
        })

        this.#listElement.addEventListener('toEdit', ({detail: todo}) => {
            this.#todos = this.#todos.filter(t => t !== todo)
            this.#onUpdate()
        })
        
    }

    /**
     * 
     * @param {SubmitEvent} e
     */
    #onSubmit(e){
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(form).get('title').toString().trim()
        if(title === ''){
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        this.#todos.push(todo)
        this.#onUpdate()
        form.reset()
    }

    #onUpdate(){
        localStorage.setItem('todos', JSON.stringify(this.#todos))
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #toggleFilter(e){
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if(filter === 'todo'){
            this.#listElement.classList.add('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        }else if(filter === 'done'){
            this.#listElement.classList.add('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        }else{
            this.#listElement.classList.remove('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        }
    }    
}

class TodoListItem {
    #element
    #todo

    /** @type {Todo} */
    constructor(todo){
        this.#todo = todo
        const id = `todo-${todo.id}`
        const li = creatElement('li', {
            class: "todo list-group-item d-flex align-items-center"
        })
        this.#element = li
        const checkbox = creatElement('input', {
            class: "form-check-input",
            type: "checkbox", 
            id,
            checked: todo.completed ? '': null
        })
        const label = creatElement('label', {
            class: "me-auto p-2 from-check-label",
            for: id
        })
        label.innerText = todo.title
        const button1 = creatElement('button', {
            class: "p-2 btn btn-danger btn-sm"
        })
        button1.innerHTML = '<i class="bi bi-pencil-square"></i>'
        const button2 = creatElement('button', {
            class: "p-2 btn btn-danger btn-sm ms-1"
        })
        button2.innerHTML = '<i class="bi-trash"></i>'
        
        li.append(checkbox)
        li.append(label)
        li.append(button1)
        li.append(button2)
        this.toggle(checkbox)
        button1.addEventListener('click', e => this.edit(e))
        button2.addEventListener('click', e => this.remove(e))
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))   
    }

    /**
     * @param {HTMLElement} element
     */
    appendTo(element){
        element.append(this.#element)
    }

    /**
     * 
     * @param {PointEvent} e 
     */
    edit(e){
        e.preventDefault()
        document.querySelector('input').value = this.#element.querySelector('label').innerText
        const event = new CustomEvent('toEdit', {
            detail: this.#todo,
            bubbles: true,
            cancelable: true
        })
        this.#element.dispatchEvent(event)
        if(event.defaultPrevented){
            return
        }
        this.#element.remove()
    }

    /**
     * 
     * @param {PointEvent} e 
     */
    remove(e){
        e.preventDefault()
        const event = new CustomEvent('delete', {
            detail: this.#todo,
            bubbles: true,
            cancelable: true
        })
        this.#element.dispatchEvent(event)
        if(event.defaultPrevented){
            return
        }
        this.#element.remove()
    }
    
    /**
     * @return {HTMLElement} 
     */
    get element(){
        return this.#element
    }

    /**
     * Change (todo / done)
     * 
     * @param {HTMLInputElement} checkbox 
     */
    toggle(checkbox){
        if(checkbox.checked){
            this.#element.classList.add('is-completed')
        }else{
            this.#element.classList.remove('is.completed')
        }
        const event = new CustomEvent('toggle', {
            detail: this.#todo,
            bubbles: true
        })
        this.#element.dispatchEvent(event)
    }

}