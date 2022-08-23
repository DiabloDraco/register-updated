let elForm = document.querySelector("#form")
let elName = document.querySelector("#name")
let elPassword = document.querySelector("#password")
let elMail = document.querySelector("#email")

elForm.addEventListener("submit" , function (evt) {
    evt.preventDefault()

    let name = elName.value.trim()    
    let password = elPassword.value.trim()    
    let mail = elMail.value.trim()    

    fetch("https://fast-ravine-16741.herokuapp.com/api/users" , {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body :JSON.stringify({ 
            "email":mail,
            "password":password,
            "name":name,
            "isAdmin":true
        })
    })
    .then(request => request.json())
    .then(data => {
        if (!data.error) {
            window.location.href = "./login.html"
        }else{
            alert(data.error)
        }
    })
})