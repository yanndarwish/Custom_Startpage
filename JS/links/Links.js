class Links {
    constructor(LinkCreator) {
        this.Links = []
        this.LinkCreator = LinkCreator

        this.$editorBtn = document.getElementById('open-link-editor')
        this.$addLinkBtn = document.getElementById('add-link')
        this.$editor = document.querySelector('.link-editor')
        this.$linksContainer = document.querySelector('.links-container')
    }

    init() {
        this.handleClick()
        this.Links = Storage.getFromLocalStorage('links')
        if (this.Links.length > 0) {
            this.renderLinksInDom()
        }
        this.handleKeyboard()
    }

    handleClick() {
        this.$editorBtn.addEventListener('click', () => {
            this.toggleEditor()
        })
        this.$addLinkBtn.addEventListener('click', () => {
            const linkUrl = document.getElementById('link-url').value
            const linkName = document.getElementById('link-name').value
            const linkCategory = document.querySelector("input[name=link-category]:checked").value

            const Link = {
                url: linkUrl,
                name: linkName,
                category: linkCategory
            }
            this.createNewLink(Link)
            // reset value
            document.getElementById('link-url').value = ""
            document.getElementById('link-name').value = ""
            document.querySelector("input[name=link-category]:checked").checked = false
        })
    }

    handleKeyboard() {
        document.addEventListener('keyup', e => {
            if (e.key === 'l') {
                if (!document.querySelector('#task-section').contains(document.activeElement)) {
                    document.querySelectorAll('.link')[0].focus()
                }
            }
        })
    }

    toggleEditor() {
        if (this.$editor.classList.contains('open-editor')) {
            this.$editor.classList.remove('open-editor')
        } else {
            this.$editor.classList.add('open-editor')
        }
    }

    createNewLink(Link) {
        console.log(Link)
        this.Links.push(Link)
        Storage.sendToLocalStorage('links', this.Links)
        this.renderLinksInDom()
    }

    renderLinksInDom() {
        this.$linksContainer.innerHTML = ""

        this.Links.forEach(link => {
            const node = `<a href="${link.url}" class="link ${link.category}" target="_blank">${link.name}</a>`

            this.$linksContainer.innerHTML += node
        })
    }

    //  todo delete link method

    // todo keyboard navigation

    // press L to activate link navigation

    // for each letter after, search for match in the names of present links

    // careful to make it unusable if task section is open
}

// todo clean task class, move localstorage functions to Storage class