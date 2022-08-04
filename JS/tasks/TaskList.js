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
                this.$wrapper.classList.add('task', 'flex', task.priority, task.done ? 'done': '')
    
                const taskItem = `
                <button class="btn delete-task" data-id="${task.id}">
                    <i class="fas fa-trash-alt" data-id="${task.id}"></i>
                </button>
                <div class="task-tags flex">
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-infos flex">
                    <p id="task-due-date">${task.due_date}</p>
                    <div>
                        <input type="checkbox" id="task-status-${task.id}" class="task-status" data-id="${task.id}" ${task.done ? 'checked': ''}>
                        <label class="status-label flex center" for="task-status-${task.id}"><span class="sr-only">Status</span><i class="fas fa-check-circle"></i></label>
                    </div>
                </div>
                `
    
                this.$wrapper.innerHTML = taskItem
                task.tags.forEach(tag => {
                    this.$wrapper.querySelector('.task-tags').innerHTML += `<div class="tag flex center ${tag}"><span class="sr-only">${tag}</span></div>`
                })
                
                this.$container.appendChild(this.$wrapper)
            });
            this.handleDeleteBtn()
            this.handleDoneBtn()
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

    // todo handle done button
    handleDoneBtn() {
        document.querySelectorAll('.task-status').forEach(btn => {
            btn.addEventListener('click', e => {
                let selectedId = e.target.getAttribute('data-id')
                let myTasks = JSON.parse(localStorage.getItem('tasks'))
                let selectedTask = myTasks.find(elt => elt.id == selectedId)

                if (e.target.checked) {
                    selectedTask.done = true
                    e.target.parentNode.parentNode.parentNode.classList.add('done')
                } else {
                    selectedTask.done = false
                    e.target.parentNode.parentNode.parentNode.classList.remove('done')
                }
                localStorage.setItem('tasks', JSON.stringify(myTasks))
            })
        })
    }

}