let key = localStorage.getItem("key")
let elWrapper = document.querySelector(".posts__left-list")
let savedWrapper = document.querySelector(".posts__right-list")
let localSaved = JSON.parse(localStorage.getItem("saved"))
let saved = []
if (localSaved) {
    saved = localSaved    
}else{
    saved = []
}

fetch("https://fast-ravine-16741.herokuapp.com/api/users/me" , {
method: "GET",
headers: {
    'Content-Type': 'application/json',
    "Authorization" : key
}
})
.then(data => data.json())
.then(info => {
    if (info.error) {
        window.location.href = "/registration.html"
    }else{
        document.querySelector(".username").textContent = info.name
    }
})

fetch("https://fast-ravine-16741.herokuapp.com/api/posts", {
method: "GET",
headers:{
    Authorization: key,
}
})
.then(req => req.json())
.then(data => render(data.posts , elWrapper))
let elTemplate = document.querySelector("#post__template").content

function render(array , wrapper) {
    wrapper.innerHTML = null
    let fragment = document.createDocumentFragment()
    
    for (let i = 0; i < array.length; i++) {
        let template = elTemplate.cloneNode(true)
        
        template.querySelector(".posts__item").classList.add(`id${array[i]._id}`)
        template.querySelector(".posts__item-title").textContent = array[i].title
        template.querySelector(".posts__item-title").classList.add(`edt${array[i]._id}`) 
        template.querySelector(".posts__item-body").textContent = array[i].body
        template.querySelector(".posts__item-body").classList.add(`edb${array[i]._id}`)
        template.querySelector(".posts__delete-text").dataset.deleteId = array[i]._id
        if (wrapper == elWrapper) {
            template.querySelector(".posts__item-save").dataset.saveId  = array[i]._id
            template.querySelector(".posts__save-text").dataset.saveId  = array[i]._id
            template.querySelector(".posts__item-edit").dataset.editId  = array[i]._id
            template.querySelector(".posts__edit-text").dataset.editId  = array[i]._id
        }
        if (wrapper == savedWrapper) {
            template.querySelector(".posts__item").classList.remove(`id${array[i]._id}`)
            template.querySelector(".posts__item").classList.add(`s${array[i]._id}`)
            template.querySelector(".posts__item-delete").dataset.saveDelId = array[i]._id
            template.querySelector(".posts__delete-text").dataset.saveDelId = array[i]._id
            
            template.querySelector(".posts__item-save").remove()
            template.querySelector(".posts__item-edit").remove()
        }
        fragment.appendChild(template)
    }
    wrapper.appendChild(fragment)
}
render(saved , savedWrapper)
elWrapper.addEventListener("click" , function (evt) {
    let current = evt.target.dataset
    
    if (current.deleteId) {
        let currentElement = document.querySelector(`.id${current.deleteId}`)
        
        fetch(`https://fast-ravine-16741.herokuapp.com/api/posts/${current.deleteId}`, {
        method: "DELETE",
        headers: {
            Authorization : key
        }
    })
    currentElement.remove()
}
if (current.editId) {
    let currentElement = document.querySelector(`.id${current.editId}`)
    
    let modal = document.querySelector(".modal__wrapper")
    modal.style.display = "flex"
    document.querySelector(".body").style.overflowY = "hidden"
    let modalForm = document.querySelector(".modal__form")
    let modalTitle = document.querySelector(".modal__title")
    let modalBody = document.querySelector(".modal__body")
    modalForm.addEventListener("submit" , function (evt) {
        evt.preventDefault()
        
        let title = modalTitle.value.trim()
        let body = modalBody.value.trim()
        modalBody.value = null
        modalTitle.value = null
        fetch(`https://fast-ravine-16741.herokuapp.com/api/posts/${current.editId}`, {
        method: "PUT",
        headers: {
            Authorization: key ,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "title":title,
                "body": body
            }
            )
        })
        modal.style.display = "none"
        document.querySelector(".body").style.overflowY = "scroll"
        if (title && body) {
            document.querySelector(`.edt${current.editId}`).textContent = title
            document.querySelector(`.edb${current.editId}`).textContent = body
        }
    })
    
}

if (current.saveId) {
    fetch(`https://fast-ravine-16741.herokuapp.com/api/posts/${current.saveId}`, {
    method: "GET",
    headers: {
        Authorization: key
    }
})
.then(req => req.json())
.then(data => saved.push(data))
localStorage.setItem("saved" , JSON.stringify(saved))
render(saved , savedWrapper)


}

})   



savedWrapper.addEventListener("click" , function (evt) {
    let current = evt.target.dataset
    if (current.saveDelId) {
        for (let i = 0; i < saved.length; i++) {
            if (saved[i]._id == current.saveDelId ) {
                saved.splice(saved.indexOf(saved[i]) , 1)
                localStorage.setItem("saved" , JSON.stringify(saved))
                document.querySelector(`.s${current.saveDelId}`).remove()
            }
        }
    }
})

let logout = document.querySelector(".logout")

logout.addEventListener("click" , function () {
    localStorage.removeItem("key")
    window.location.href = "./registration.html"
})

let elPost = document.querySelector(".post__new-post")

elPost.addEventListener("click" , function () {
    let modal = document.querySelector(".modal__wrapper")
    document.querySelector(".modal__heading").textContent = "New Post"
    modal.style.display = "flex"
    document.querySelector(".body").style.overflowY = "hidden"
    document.querySelector(".modal__save").style.display = "none"
    let newPost = document.querySelector(".modal__cancel") 
    newPost.type = "submit"
    newPost.textContent = "Post"
    newPost.style.background = 'linear-gradient(180deg, #E93B77 0%, #DA1F63 100%)'
    newPost.style.color = "white"
    
    let elTitle = document.querySelector(".modal__title")
    let elBody = document.querySelector(".modal__body")
    let elForm = document.querySelector(".modal__form")
    elForm.addEventListener("submit" , function (evt) {
        evt.preventDefault()
        
        let title = elTitle.value
        let body = elBody.value
        
        fetch(`https://fast-ravine-16741.herokuapp.com/api/posts` , {
        method: "POST",
        headers:{
            Authorization: key,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "title":title,
                "body":body
            }
            )
        })
        modal.style.display = "none"
        document.querySelector(".body").style.overflowY = "scroll"
    })
})

let elRefresh = document.querySelector(".refresh")

elRefresh.addEventListener("click" , function () {
    window.location.reload()
})
