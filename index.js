const baseURL = "http://localhost:3000"
const loginURL = `${baseURL}/login`
const loginForm = document.querySelector("#login")

loginForm.addEventListener("submit", authentication)

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
            console.log(result.token)
            localStorage.setItem("token", result.token)
        })
    
    if (localStorage.token) {
        redirect()
    }

    event.target.reset()
}

function redirect() {
    window.location.href = `show.html`
}