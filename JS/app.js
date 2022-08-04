class App {
    constructor() {
    }

    main() {
        const username = new Username()
        username.render()

        const quote = new QuoteGenerator()
        quote.render()

        const clock = new Clock()
        setInterval(function(){clock.render()} , 1000);

        const date = new MyDate()
        date.render()

        const task = new Tasks()
        task.handleEditBtn()
        task.displayTasks()

        const myFilter = new Filter()
        myFilter.updateFilter()

        // const tasklist = new TaskList()
        // tasklist.render(JSON.parse(localStorage.getItem('tasks')))
    }
}

const app = new App()
app.main()