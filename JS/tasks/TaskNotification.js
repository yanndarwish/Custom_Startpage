class TaskNotification {
    constructor() {
        this.$wrapper = document.getElementById('task-notification')
    }

    render() {
        let myTasks = JSON.parse(localStorage.getItem('tasks')),
            toDo    = myTasks.filter(elt => elt.done === false)
            
        if (toDo.length === 0) {
            this.$wrapper.style.background = 'rgb(49, 168, 49)'
        } else {
            this.$wrapper.style.background = 'red'
        }
        this.$wrapper.innerHTML = toDo.length
    }
}