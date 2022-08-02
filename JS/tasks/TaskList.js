class TaskList {
    constructor(Tasks) {
        this.Tasks = Tasks
        this.$container = document.querySelector('.task-container')
    }

    render(Tasks) {
        console.log(Tasks)
        this.$container.innerHTML = ""
        if (Tasks) {
            Tasks.forEach(task => {
                this.$wrapper = document.createElement('div')
                this.$wrapper.classList.add('task', 'flex', task.priority)
    
                const taskItem = `
                <button class="btn delete-task" data-id="${task.id}">
                    <i class="fas fa-trash-alt" data-id="${task.id}"></i>
                </button>
                <div class="badge task-id flex center">${task.id}</div>
                <div class="task-tags flex">
                </div>
                <p class="task-description">${task.description}</p>
                <div class="flex">
                    <p id="task-due-date">${task.due_date}</p>
                    <div>
                        <input type="checkbox" id="task-status" class="task-status">
                        <label for="task-status"><span class="sr-only">Status</span>Done ?</label>
                    </div>
                </div>
                `
    
                this.$wrapper.innerHTML = taskItem
                task.tags.forEach(tag => {
                    this.$wrapper.querySelector('.task-tags').innerHTML += `<div class="tag flex center ${tag}"></div>`
                })
                
                this.$container.appendChild(this.$wrapper)
            });
            this.handleDeleteBtn()
        }
    }

    handleDeleteBtn() {
        document.querySelectorAll('.delete-task').forEach(btn => {
            btn.addEventListener('click', e => {
                let selectedId = e.target.getAttribute('data-id')
                let myTasks = JSON.parse(localStorage.getItem('tasks'))
                let selectedTask = myTasks.find(elt => elt.id == selectedId)
                let remainingTasks = myTasks.filter(elt => elt !== selectedTask)
                
                localStorage.setItem('tasks', JSON.stringify(remainingTasks))
                this.render(remainingTasks)
            })
        })
    }

}