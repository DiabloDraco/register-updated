let key = localStorage.getItem("key")

fetch("https://fast-ravine-16741.herokuapp.com/api/users" , {
    method: "GET",
    headers:{
        "Authorization" : key
    }
})
.then(request => request.json)
.then(data => {
    if (data.error) {
        window.location.href = "./registration.html"
    }
})


let elTemplate = document.querySelector("#post__template").content

function render(array , wrapper) {
    wrapper.innerHTML = null
    let fragment = document.createDocumentFragment()

    for (let i = 0; i < array.length; i++) {
        let template = elTemplate.cloneNode(true)

        template.querySelector(".posts__item-title").textContent = array[i].title
        template.querySelector(".posts__item-body").textContent = array[i].body
        if (wrapper == elWrapper) {

        }
        if (wrapper == saveddWrapper) {
            
        }
    }
}