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
        // console.log("expense:",user.expenses)
        sumExpenses(user)
    })

    .then(createExpense)
    // .then(totalSpent)

// function displayUsername(user){
//     const h1 = document.querySelector(".user-header")
//     h1.innerText = `${user.username}'s Piggy Bank`
//     document.body.appendChild(h1)
// }

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
        // .then(expense => {
        //     const newTotalExpenseH3 = document.getElementById("total-expense-number")
        //     parseInt(newTotalExpenseH3).innerText = ++ expense.amount
        //     // totalExpensesDiv.append(totalExpenseH3)
        // })
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

fetch(articleURL)
    .then(response => response.json())
    .then(showArticles)

function showArticles(articles) {
    const articleDiv = document.querySelector(".articles")
    articles.forEach(article => {
        const card = document.createElement("article")
        card.className = "article-card"
        const title = document.createElement("h3")
        const image = document.createElement("img")
        image.onclick = function() {
            window.location.href = `${article.url}`;
          };

        title.innerHTML = `<a href = "${article.url}" target = "_blank">${article.title}</a>`
        image.src = article.image

        card.append(image, title)
        articleDiv.append(card)
    })

}

function sumExpenses(user){
    expense_array = []
    user.expenses.map(expense => {
        (expense_array.push(expense.amount))
    })
    console.log(expense_array)
    expenseSum = expense_array.reduce((total, amount) => total + amount);
    console.log(expenseSum)
    showTotalExpenses()
}

function showTotalExpenses() {
    const totalExpensesDiv = document.querySelector(".total-expenses")
    totalExpenseH3 = document.createElement("h3")
    totalExpenseH3.id = "total-expense-number"
    totalExpenseH3.innerText = `Total Expenses: ${expenseSum}`
    totalExpensesDiv.append(totalExpenseH3)
    
}