const baseURL = "http://localhost:3000"
const expenseURL = `${baseURL}/expenses`
const userURL = `${baseURL}/users`
const articleURL = `${baseURL}/articles`
let params = new URLSearchParams(window.location.search)
let id = params.get('id')
// const divExpenses = document.getElementById("expense-list")


fetch(`${userURL}/${id}`)
    .then(response => response.json())
    .then(user => {
        persistExpense(user)
    })

    .then(createExpense)
    // .then(totalSpent)

function createExpense(){
    const expenseForm = document.querySelector(".expenses")
    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const expenseItem = formData.get("item")
        const expenseAmount = formData.get("amount")

        const divExpenses = document.getElementById("expense-list")

        const expenseListElement = document.createElement("p")

        expenseListElement.innerText = `${expenseItem}: $ ${expenseAmount}`

        divExpenses.append(expenseListElement)

        event.target.reset()

        fetch(expenseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: id,
                item: expenseItem,
                amount: expenseAmount
            })
        })
    })
    // persistExpense()
}

function persistExpense(user) {
    // console.log("user:",user.expenses.item)
    user.expenses.forEach(expense => {
        const divExpenses = document.getElementById("expense-list")
        const expenseListElement = document.createElement("p")
        expenseListElement.innerText = `${expense.item}: $ ${expense.amount}`
        console.log(expenseListElement)
        divExpenses.append(expenseListElement)
    })
}
