// use to connect or communicate with the rails server api 
// and send the information to the front end 
class ListsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/lists'
    }

    //make fetch request to the base Url and git the responce to Json format 
    getLists() {
        return fetch(this.baseUrl).then(res => res.json())
    }
    createList(value) {
        const list = {
            body: value,
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ list }),
        }).then(res => res.json())
    }
    updateList(value, id) {
        const list = {
            body: value,
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ list }),
        }).then(res => res.json())
    }
}