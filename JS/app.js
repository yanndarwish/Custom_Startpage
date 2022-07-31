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
    }
}

const app = new App()
app.main()