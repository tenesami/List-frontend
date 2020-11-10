//It contains all the lists and all the js codes lives here 
class Lists {
    constructor() {
        this.lists = []
        this.adapter = new ListsAdapter()
        this.initBindingAndEventListners()
        this.fetchAndLoadLists()
    }

    initBindingAndEventListners() {
        this.listsContainer = document.getElementById('lists-container')
        this.body = document.querySelector('body')
        this.newListBody = document.getElementById('new-list-body')
        this.listForm = document.getElementById('new-list-form')
        this.listForm.addEventListener('submit', this.createList.bind(this))
        this.listsContainer.addEventListener('dblclick', this.handleListDclick.bind(this))
        this.body.addEventListener('blur', this.updateList.bind(this), true)
    }


    createList(e) {
        e.preventDefault()
        const value = this.newListBody.value

        this.adapter.createList(value).then(list => {
            this.lists.push(new List(list))

            this.newListBody.value = ''
            this.render()
        })
    }

    handleListDclick(e) {
        this.toggleListe(e)
    }

    toggleListe(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateList(e) {
        const li = e.target
        li.contentEditable = false
        li.classList.remove("editable")
        const newValue = li.innerHTML
        const id = li.dataset.id
        console.log(id)
        this.adapter.updateList(newValue, id)
    }

    //use list adapter to get the lists information 
    fetchAndLoadLists() {
            this.adapter
                .getLists()
                .then(lists => {
                    //once it get the list it will iterate over one of each 
                    //componets push the list into the lists[] 
                    //we add it to this.list to make it accessible through class 
                    lists.sort((a, b) => a.id - b.id).forEach(list => this.lists.push(new List(list)))
                })
                .then(() => {
                    this.render()
                })

        }
        //render append the information to the DOM
    render() {
        // const notesContaners = document.getElementById('lists-container')
        // notesContaners.innerHTML = this.lists.map(list => `<li>$(list.body}</li>`).join('')
        this.listsContainer.innerHTML = this.lists.map(list => list.renderLi()).join('')
    }

}