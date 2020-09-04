const baseURL = "http://localhost:3000"
const loginURL = `${baseURL}/login`
const loginForm = document.querySelector("#login")
const userURL = `${baseURL}/users`
const createAccount = document.querySelector(".create-account")

loginForm.addEventListener("submit", authentication)
createAccount.addEventListener("click", createNewUser)

function authentication(event) {
    event.preventDefault()
    const userFormData = new FormData(event.target)
    const username = userFormData.get("username")
    const password = userFormData.get("password")

    fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(response => response.json())
        .then(result => {
            localStorage.setItem("token", result.token)
            redirect(result)
        })
}

function redirect(result){
    window.location.href = `show.html?id=${result.user.id}`
}

function createNewUser() {
    window.location.href = "create_account.html"
}
