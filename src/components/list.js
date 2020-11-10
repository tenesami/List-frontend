class List {
    constructor(listJSON) {
        this.id = listJSON.id
        this.body = listJSON.body
    }
    renderLi() {
        return `<li data-id=${this.id}>${this.body}<li>`
    }
}