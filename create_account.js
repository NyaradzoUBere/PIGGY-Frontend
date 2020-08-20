const baseURL = "http://localhost:3000"
const loginURL = `${baseURL}/login`
const usersURL = `${baseURL}/users`
const createUserForm = document.getElementById("create-user")

createUserForm.addEventListener("submit", createAccount)

function createAccount(event) {
    event.preventDefault()
    const createUserFormData = new FormData(event.target)
    const username = createUserFormData.get("username")
    const password = createUserFormData.get("password")
    
    fetch(usersURL, {
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
        .then(redirect)
}

function redirect(){
    window.location.href = `index.html`
}
