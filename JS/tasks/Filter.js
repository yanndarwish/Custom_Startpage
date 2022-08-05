class Filter {
    constructor() {
        this.$filterOptions   = document.querySelectorAll('.filter-option')
        this.$priorityFilters = document.querySelectorAll('.priority-filter')
        this.$tagFilters      = document.querySelectorAll('.tag-filter')
        this.$statusFilters   = document.querySelectorAll('.status-filter')
        this.bufferTasks      = JSON.parse(localStorage.getItem('tasks'))
        this.Tasks            = JSON.parse(localStorage.getItem('tasks'))
        this.filteredTasks
        this.selectedTags     = []
        this.selectedPriority
        this.selectedStatus
    }

    updateFilter() {
        // check if is checked or not
        this.$filterOptions.forEach(option => {
            option.addEventListener('click', e => {
                if(e.target.classList.contains('priority-filter')) {
                    this.selectedPriority = option.getAttribute('data-value')
                } else if (e.target.classList.contains('tag-filter')) {
                    if (e.target.checked) {
                        this.selectedTags.push(option.getAttribute('data-value'))
                    } else {
                        const index = this.selectedTags.indexOf(e.target.getAttribute('data-value'))
                        this.selectedTags.splice(index, 1)
                    }
                } else if (e.target.classList.contains('status-filter')) {
                    this.selectedStatus = option.getAttribute('data-value')
                }
                
                this.applyFilter(this.Tasks, this.selectedPriority, this.selectedTags, this.selectedStatus)
            })
        })
    }

    applyFilter(tasks, priority, tags, status) {
        this.filteredTasks = []
        if (priority) {
            if (priority !== 'all') {
                let matches        = tasks.filter(elt => elt.priority === priority)
                this.filteredTasks = matches
                this.bufferTasks   = this.filteredTasks
            } else {
                this.bufferTasks   = tasks
                this.filteredTasks = tasks
            }
        }
        if (tags.length > 0) {
            let loopTasks = this.bufferTasks
            tags.forEach(tag => {
                let matches        = loopTasks.filter(elt => elt.tags.includes(tag))
                loopTasks          = matches
                this.filteredTasks = matches
                this.bufferTasks   = this.filteredTasks
                })
        }  else {
            this.filteredTasks = this.bufferTasks
        }
        if (status) {
            if (status !== 'all') {
                status = (status === 'True')
                let matches        = this.bufferTasks.filter(elt => elt.done === status)
                this.filteredTasks = matches
            } else {
                this.filteredTasks = this.bufferTasks
                this.bufferTasks   = tasks
            }
        }
    
        const tasklist = new TaskList(this.filteredTasks)
        tasklist.render(this.filteredTasks)
    }
}