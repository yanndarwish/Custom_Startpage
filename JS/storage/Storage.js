class Storage {

    static sendToLocalStorage(variable, array) {
        localStorage.setItem(variable, JSON.stringify(array))
    }

     static getFromLocalStorage(variable) {
        let array = []
        console.log(variable)
        JSON.parse(localStorage.getItem(variable)) ? array = JSON.parse(localStorage.getItem(variable))
        : array = []
        return array
    }
}