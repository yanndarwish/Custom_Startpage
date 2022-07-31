class Username {
    constructor() {
        this.$wrapper = document.getElementById('username')
        this.usernames = ['Mr', 'Sir', 'Creator', 'Great Maker']
    }
    
    render() {
        let username = this.usernames[Math.floor(Math.random()*this.usernames.length)];

        this.$wrapper.innerHTML = username
    }
}