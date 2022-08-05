class TaskList {
    constructor(Tasks) {
        this.Tasks      = Tasks
        this.$container = document.querySelector('.task-container')
    }

    render() {
        this.sort()
        const notifications = new TaskNotification()
        notifications.render()

        this.$container.innerHTML = ""
        if (this.Tasks) {
            this.Tasks.forEach(task => {
                this.$wrapper = document.createElement('div')
                this.$wrapper.classList.add('task', 'flex', task.priority, task.done ? 'done': 'to-do')
    
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

    sort() {
        console.log(this.Tasks)
        // sort by date
        this.Tasks = this.Tasks.sort(function (a, b) {
            return +new Date(a.due_date) - +new Date(b.due_date)
        })
        // sort by priority
        this.Tasks.sort((a, b) => a.priority.localeCompare(b.priority))
        // sort by status
        this.Tasks.sort(function(a, b) {
            // false values first
            return (a.done === b.done)? 0 : a.done? 1 : -1;
        });
    }

    handleDeleteBtn() {
        document.querySelectorAll('.delete-task').forEach(btn => {
            btn.addEventListener('click', e => {
                let selectedId     = e.target.getAttribute('data-id'),
                    myTasks        = JSON.parse(localStorage.getItem('tasks')),
                    selectedTask   = myTasks.find(elt => elt.id == selectedId),
                    remainingTasks = myTasks.filter(elt => elt !== selectedTask)

                this.Tasks = remainingTasks
                localStorage.setItem('tasks', JSON.stringify(remainingTasks))
                this.render(remainingTasks)

                const notifications = new TaskNotification()
                notifications.render()      
            })
        })
    }

    handleDoneBtn() {
        document.querySelectorAll('.task-status').forEach(btn => {
            btn.addEventListener('click', e => {
                let selectedId   = e.target.getAttribute('data-id'),
                    myTasks      = JSON.parse(localStorage.getItem('tasks')),
                    selectedTask = myTasks.find(elt => elt.id == selectedId)

                if (e.target.checked) {
                    selectedTask.done = true
                    e.target.parentNode.parentNode.parentNode.classList.add('done')
                } else {
                    selectedTask.done = false
                    e.target.parentNode.parentNode.parentNode.classList.remove('done')
                }

                localStorage.setItem('tasks', JSON.stringify(myTasks))
                this.Tasks = myTasks
                
                const notifications = new TaskNotification()
                notifications.render()

                const myFilter = new Filter()
                myFilter.updateFilter()

                this.render()
            })
        })
    }

}