class TaskList {
    constructor(Tasks) {
        this.Tasks = Tasks
        this.$container = document.querySelector('.task-container')
    }

    render() {
        console.log(this.Tasks)
        this.$container.innerHTML = ""
        if (this.Tasks) {
            this.Tasks.forEach(task => {
                this.$wrapper = document.createElement('div')
                this.$wrapper.classList.add('task', 'flex', task.priority)
    
                const taskItem = `
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
                    console.log(tag)
                    this.$wrapper.querySelector('.task-tags').innerHTML += `<div class="tag flex center ${tag}"></div>`
                })
                
                this.$container.appendChild(this.$wrapper)
            });
        }
    }

    // todo remove task when click on trash icon

}