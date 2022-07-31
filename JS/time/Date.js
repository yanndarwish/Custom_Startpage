class MyDate {
    constructor() {
        this.$wrapper = document.getElementById('date')
    }

    render() {
        let d = new Date()

        this.$wrapper.innerHTML = d.toDateString()
    }
}