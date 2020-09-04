const baseURL = "http://localhost:3000"
const expenseURL = `${baseURL}/expenses`
const userURL = `${baseURL}/users`
const articleURL = `${baseURL}/articles`
let params = new URLSearchParams(window.location.search)
let id = params.get('id')
const totalExpensesDiv = document.querySelector(".total-expenses")
const expenseForm = document.querySelector(".expenses")
let chartData = []
let data
logOut()

fetch(`${userURL}/${id}`)
    .then(response => response.json())
    .then(user => {
        persistExpense(user)
            if ((user.expenses)[0]) {
                sumExpenses(user)
            }else{
                noTotalExpense()
            }
        addChart(user)
    })
    .then(createExpense)


function noTotalExpense() {
    totalExpenseH3 = document.createElement("h3")
    totalExpenseH3.id = "total-expense-number"
    totalExpenseH3.innerText = `Total Expenses: $ ${0}`
    totalExpensesDiv.append(totalExpenseH3)
}
function createExpense(){
    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const expenseItem = formData.get("item")
        const expenseAmount = formData.get("amount")
        const divExpenses = document.getElementById("expense-list")
        const expenseListElement = document.createElement("p")

        expenseListElement.innerText = `${expenseItem}: $ ${expenseAmount}`
        divExpenses.append(expenseListElement)
        
        expenseAutoUpdate(expenseAmount)

        data.append([
            `${expenseItem}`, `${expenseAmount}`]
        )
        
        event.target.reset()
        updateExpensesBackend(expenseItem, expenseAmount)
        
    })
}

function expenseAutoUpdate(expenseAmount) {
    let totalExpense = parseInt(totalExpensesDiv.querySelector("#total-expense-number").innerText.split(": $ ")[1])
    totalExpensesDiv.querySelector("#total-expense-number").innerText = `Total Expenses: $ ${totalExpense + parseInt(expenseAmount)}`
}

function updateExpensesBackend(item, amount) {
    fetch(expenseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: id,
            item,
            amount
        })
    })
}

function persistExpense(user) {
    user.expenses.forEach(expense => {
        const divExpenses = document.getElementById("expense-list")
        const expenseListElement = document.createElement("p")
        expenseListElement.innerText = `${expense.item}: $ ${expense.amount}`
        divExpenses.append(expenseListElement)
        data = [{
            x: `${expense.item}, value: ${expense.amount}`
        }]
    })
}

function addChart(user) {
    user.expenses.forEach(expense => {
        chartData.push([
            `${expense.item}`, `${expense.amount}`]
        )
    })

    anychart.onDocumentReady(function () {
    anychart.theme('pastel');
            data = anychart.data.set(chartData)
    
            let chart = anychart.pie(data);

            chart
              .innerRadius('65%')
              .explode(25);
    
            let label = anychart.standalones.label();
            label
              .enabled(true)
              .text('Your Expense Breakdown')
              .width('100%')
              .height('100%')
              .adjustFontSize(true, true)
              .minFontSize(10)
              .maxFontSize(25)
              .fontColor('#60727b')
              .position('center')
              .anchor('center')
              .hAlign('center')
              .vAlign('middle');

            chart.center().content(label);
    
            let palette = anychart.palettes.rangeColors();
            palette.items([{ color: '#e5bbed' }, { color: '#ff6e40' }]);
            chart.palette(palette);
    
            chart.hovered().fill('#6f3448');
    
            chart.selected().fill('#ff6e40');
    
            chart
              .hovered()
              .outline()
              .fill(function () {
                return anychart.color.lighten('#6f3448', 0.55);
              });

            chart
              .selected()
              .outline()
              .offset(5)
              .fill(function () {
                return anychart.color.lighten('#ff6e40', 0.25);
              });
    
            chart.container('container');
            document.getElementById("container").style.background="#fae2e6";
            
            chart.draw();

            chart.background("pink 0.001");
            document.getElementById("container").style.background="#fae2e6"
        
        });
        }

fetch(articleURL)
    .then(response => response.json())
    .then(showArticles)

function showArticles(articles) {
    articles.forEach(article => {
        const card = document.createElement("article")
        card.className = "article-card"
        const title = document.createElement("h3")
        const image = document.createElement("img")

        showArticleOnClick(image, article)
        articleCard(article, title, image)
        card.append(image, title)
        appendArticleCard(card)
    })

}

function showArticleOnClick(image, article) {
    image.onclick = function() {
        window.location.href = `${article.url}`;
    };
}

function articleCard(article, title, image) {
    title.innerHTML = `<a href = "${article.url}" target = "_blank">${article.title}</a>`
    image.src = article.image
}

function appendArticleCard(card) {
    articleDiv = document.querySelector(".articles")
    articleDiv.append(card)    
}

function sumExpenses(user){
    expense_array = []
    user.expenses.map(expense => {
        (expense_array.push(expense.amount))
    })
    expenseSum = expense_array.reduce((total, amount) => total + amount);
    showTotalExpenses()
}

function showTotalExpenses() {
    totalExpenseH3 = document.createElement("h3")
    totalExpenseH3.id = "total-expense-number"
    totalExpenseH3.innerText = `Total Expenses: $ ${expenseSum}`
    totalExpensesDiv.append(totalExpenseH3)
}

function logOut() {
    const logOut = document.querySelector("#log-out")
    logOut.addEventListener("click", logOutRedirect)
}

function logOutRedirect() {
        window.location.href = "index.html"
}

clearExpensesOption()

function clearExpensesOption(){
    const nav = document.querySelector(".nav")
    const clearExpensesListElement = document.createElement("li")
    clearExpensesListElement.id = "clear-expenses"
    clearExpensesListElement.innerText = "Clear My Expenses"
    nav.append(clearExpensesListElement)
    clearExpensesEvent()
}

function clearExpensesEvent(item, amount) {
    const clearExpensesListElement = document.querySelector("#clear-expenses")
    clearExpensesListElement.addEventListener("click", clearExpenses)
}

function clearExpenses() {
    fetch(`${userURL}/${id}`, { method: "DELETE" })
    location.reload()
}
