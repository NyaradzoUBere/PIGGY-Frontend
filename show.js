const baseURL = "http://localhost:3000"
const expenseURL = `${baseURL}/expenses`
const userURL = `${baseURL}/users`
const articleURL = `${baseURL}/articles`
let params = new URLSearchParams(window.location.search)
let id = params.get('id')
const totalExpensesDiv = document.querySelector(".total-expenses")
// const divExpenses = document.getElementById("expense-list")
const expenseForm = document.querySelector(".expenses")
let chartData = []
let data

fetch(`${userURL}/${id}`)
    .then(response => response.json())
    .then(user => {
        persistExpense(user)
        if ((user.expenses)[0]) {
            sumExpenses(user)
        }else{
            totalExpenseH3 = document.createElement("h3")
            totalExpenseH3.id = "total-expense-number"
            totalExpenseH3.innerText = `Total Expenses: $ ${0}`
            totalExpensesDiv.append(totalExpenseH3)

        }
        addChart(user)
    })

    .then(createExpense)
    // .then(totalSpent)

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
        
        let totalExpense = parseInt(totalExpensesDiv.querySelector("#total-expense-number").innerText.split(": $ ")[1])

        totalExpensesDiv.querySelector("#total-expense-number").innerText = `Total Expenses: $ ${totalExpense + parseInt(expenseAmount)}`

        data.append([
            `${expenseItem}`, `${expenseAmount}`]
        )
        
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
}

function persistExpense(user) {
    // console.log("user:",user.expenses.item)
    user.expenses.forEach(expense => {
        const divExpenses = document.getElementById("expense-list")
        const expenseListElement = document.createElement("p")
        expenseListElement.innerText = `${expense.item}: $ ${expense.amount}`
        console.log(expenseListElement)
        divExpenses.append(expenseListElement)
        data = [{
            x: `${expense.item}, value: ${expense.amount}`
        }]
    })
}

// function addChart(user){
//     console.log("user expenses:", user.expenses)
//     let data = []
//     user.expenses.forEach(expense => {
//         data.push({
//             x: `${expense.item}`, value: `${expense.amount}`
//         })
//     })
//     console.log(data)
//     anychart.onDocumentReady(function() {
//         // create the chart
//         let chart = anychart.pie();
      
//         // set the chart title
//         chart.title("Your Total Expense Breakdown");
      
//         // add the data
//         chart.data(data);
      
//         // display the chart in the container
//         chart.container('container');
//         chart.draw();
//         // chart.tooltip().background().fill("#fae2e6")
//         // let background = chart.tooltip().background();
//         // background.fill("#fae2e6");
//         chart.background("pink 0.1");
//         document.getElementById("container").style.background="#fae2e6"
        
//         // chart.tooltip().fontColor("gold")
      
//       });
// }

function addChart(user) {
    user.expenses.forEach(expense => {
        chartData.push([
            `${expense.item}`, `${expense.amount}`]
        )
    })
    // console.log(chartData)

    anychart.onDocumentReady(function () {
        // set chart theme
    anychart.theme('pastel');
            // create data set
            data = anychart.data.set(chartData)
    
            // create pie chart with passed data
            let chart = anychart.pie(data);

            // set chart radius
            chart
              .innerRadius('65%')
              // set value for the exploded slices
              .explode(25);
    
            // create standalone label and set settings
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
    
            // set label to center content of chart
            chart.center().content(label);
    
            // create range color palette with color ranged
            let palette = anychart.palettes.rangeColors();
            palette.items([{ color: '#e5bbed' }, { color: '#ff6e40' }]);
            // set chart palette
            chart.palette(palette);
    
            // set hovered settings
            chart.hovered().fill('#6f3448');
    
            // set selected settings
            chart.selected().fill('#ff6e40');
    
            // set hovered outline settings
            chart
              .hovered()
              .outline()
              .fill(function () {
                return anychart.color.lighten('#6f3448', 0.55);
              });

    
            // set selected outline settings
            chart
              .selected()
              .outline()
              .offset(5)
              .fill(function () {
                return anychart.color.lighten('#ff6e40', 0.25);
              });
    
            // set container id for the chart
            chart.container('container');
            document.getElementById("container").style.background="#fae2e6";
            
            // initiate chart drawing
            chart.draw();

            // Set chart background color
            chart.background("pink 0.001");
            document.getElementById("container").style.background="#fae2e6"
        
          });
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
    expenseSum = expense_array.reduce((total, amount) => total + amount);
    showTotalExpenses()
}

function showTotalExpenses() {
    totalExpenseH3 = document.createElement("h3")
    totalExpenseH3.id = "total-expense-number"
    totalExpenseH3.innerText = `Total Expenses: $ ${expenseSum}`
    totalExpensesDiv.append(totalExpenseH3)

    console.log(totalExpenseH3.innerText)
}
