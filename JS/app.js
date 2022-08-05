class App {
    constructor() {
        this.username    = new Username()
        this.quote       = new QuoteGenerator()
        this.date        = new MyDate()

        this.tasksMaster = new TasksMaster()
        this.filter      = new Filter()
    }

    main() {
        // header
        this.username.render()

        this.quote.render()

        const clock = new Clock()
        setInterval(function(){clock.render()} , 1000);

        this.date.render()

        // task section
        this.tasksMaster.makeKeyboardAccesible()
        this.tasksMaster.handleEditBtn()
        this.tasksMaster.handleAddBtn()
        this.tasksMaster.displayTasks()

        this.filter.updateFilter()

        // todo archive the done tasks in local storage to keep data 
    }
}

const app = new App()
app.main()