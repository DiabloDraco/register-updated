let elForm = document.querySelector(".auth__form")
let elMail = document.querySelector(".auth__mail")
let elPassword = document.querySelector(".auth__password")


elForm.addEventListener("submit" , function (evt) {
    evt.preventDefault()

    let mail = elMail.value.trim()
    let password = elPassword.value.trim()

    fetch("https://fast-ravine-16741.herokuapp.com/api/auth" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "email":mail,
                "password":password
            }
        )
    })
    .then(request => request.json())
    .then(data => {
        if (!data.error) {
            localStorage.setItem("key" , data.Authorization)
            window.location.href = "./index.html"
        }else{
            alert(data.error)
        }
    })
})