class QuoteGenerator {
    constructor() {
        this.$wrapper = document.getElementById('quote')
    }

    render() {
        let quote = quotes[Math.floor(Math.random()*quotes.length)];
        this.$wrapper.innerHTML = quote
    }
}