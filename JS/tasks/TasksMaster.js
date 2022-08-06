class TasksMaster {
    constructor() {
        this.$modalOverlay = document.getElementById('add-task-overlay')
        this.$modalBtns    = document.querySelectorAll('.handle-task-settings')
        this.$addTaskBtn   = document.getElementById('add-task')
        this.Tasks         = JSON.parse(localStorage.getItem('tasks'))
    }

    makeKeyboardAccesible() {
        document.addEventListener('keyup', e => {
            if (e.key === 't') {
                document.querySelector('#task-description').focus()
                document.querySelector('#task-section').classList.add('open')
                e.target.setAttribute('aria-expanded', true)
            } else if (e.key === 'Escape') {
                document.querySelector('.welcome').focus()
                document.querySelector('#task-section').classList.remove('open')
                document.querySelector('#task-btn').setAttribute('aria-expanded', false)
            } else if (e.key === ' ') {
                let deleteArray = document.querySelectorAll('.delete-task')
                if (deleteArray.length > 0) {
                    deleteArray[0].focus()
                }
            }
        })
        document.querySelector('#task-btn').addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                if (e.target.getAttribute('aria-expanded') === 'false') {
                    document.querySelector('#task-section').classList.add('open')
                    e.target.setAttribute('aria-expanded', true)
                } else {
                    document.querySelector('#task-section').classList.remove('open')
                    e.target.setAttribute('aria-expanded', false)
                }
            }
        })
    }

    handleEditBtn() {
        this.$modalBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault()
                if (e.target.getAttribute('aria-expanded') === 'false') {
                    this.$modalOverlay.style.display = 'block'
                    this.$modalBtns.forEach(btn => {
                        btn.setAttribute('aria-expanded', true)
                    })
                } else {
                    this.$modalOverlay.style.display = 'none'
                    this.$modalBtns.forEach(btn => {
                        btn.setAttribute('aria-expanded', false)
                    })
                }
            })
        })
    }

    handleAddBtn() {
        this.$addTaskBtn.addEventListener('click', e => {
            e.preventDefault()
            // check for preexisting tasks and instanciate id
            let storedTasks = JSON.parse(localStorage.getItem('tasks'))
            let id = !storedTasks || storedTasks.length === 0 ? 1 : storedTasks[storedTasks.length -1].id + 1

            // initiate task object from input data
            let taskDescription = document.querySelector('#task-description').value,
                taskPriority    = document.querySelector("[name='task-priority']:checked").value,
                today           = new Date(),
                month           = (today.getMonth()+1) < 10 ? "0" + (today.getMonth()+1) : (today.getMonth()+1),
                day             = today.getDate() < 10 ? "0" + today.getDate() : today.getDate(),
                taskDate        = today.getFullYear() + '-' + month + '-' + day,
                taskDueDate     = document.getElementById('due-date').value,
                taskTags        = []
            document.querySelectorAll(".taglist:checked").forEach(tag => {
                taskTags.push(tag.name)
            })
    
            let task = {
                id: id,
                description: taskDescription,
                priority: taskPriority,
                tags: taskTags,
                date: taskDate,
                due_date: taskDueDate,
                done:false
            }
            // convert to array to ease data manipulation
            let tasks = [task]
            // push to localstorage
            if (!storedTasks) {
                localStorage.setItem('tasks', JSON.stringify(tasks))
                this.Tasks = tasks
            } else {
                storedTasks.push(task)
                localStorage.setItem('tasks', JSON.stringify(storedTasks))
                this.Tasks = storedTasks
            }
            this.resetTaskSettings()
            this.displayTasks()
        })
    }

    resetTaskSettings() {
        // reset inputs
        let checkboxes = document.querySelectorAll("input[type='checkbox']")

        checkboxes.forEach(checkbox => {
            checkbox.checked = false
        })

        document.querySelector("input[type='date']").value = ""
        document.querySelector('#task-description').value  = ""
        // close task settings modal
        this.$modalOverlay.style.display = 'none'
        this.$modalBtns.forEach(btn => {
            btn.setAttribute('aria-expanded', false)
        })
    }

    displayTasks() {
        // display all the tasks in DOM
        const tasklist = new TaskList(this.Tasks)
        tasklist.render()
    }

    // todo make T press ineffective if Link section is open

    // todo make Space ineffective when task description input is in focus
}