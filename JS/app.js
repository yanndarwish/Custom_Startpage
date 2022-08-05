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

        // todo archive the done tasks in local storage to keep data 
    }
}

const app = new App()
app.main()