class TaskNotification {
    constructor() {
        this.$wrapper = document.getElementById('task-notification')
    }

    render() {
        let myTasks = JSON.parse(localStorage.getItem('tasks'))
        let toDo = myTasks.filter(elt => elt.done === false)
        this.$wrapper.innerHTML = toDo.length
    }
}