# Piggy-WebApp-Frontend


## Table of Contents
* [About](#about-piggy)
* [Video](#piggy-walkthrough-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Code Examples](#code-examples)
* [Features](#piggy-features)
* [Status](#status)
* [Why Piggy](#why-piggy)
* [Contact](#contact)
* [License](#license)

## About Piggy
Piggy is an expense tracker for users. Users get some insight about what their "piggy bank" is being spent on through a list breakdown of their expenses along with a chart breakdown of total expenses. Resources are also provided to the user to increase their financial literacy and budgetting habits.


## Piggy Walkthrough Video
[Piggy Walkthrough](https://www.youtube.com/watch?v=RGHFK_7I1lU&feature=youtu.be)

## Technologies
JavaScript ES6

HTML5 / CSS3

## Setup

1. To run this project, please go to the [Piggy Backend repo](https://github.com/NyaradzoUBere/Piggy-WebApp-Backend)
1. Run ~ lite-server in your front-end directory
1. [Click here!](http://localhost:3001)

## Code Examples

```
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
```
```
function sumExpenses(user){
    expense_array = []
    user.expenses.map(expense => {
        (expense_array.push(expense.amount))
    })
    expenseSum = expense_array.reduce((total, amount) => total + amount);
    showTotalExpenses()
}
```
## Piggy Features
* Input and track expenses
* Visualize expenses through a colored donut chart
* Provide finance and budgetting resources


To-Do List:
* Add expense breakdown option: labeling expense type

## Status
Completed.

This app is built to carry out the CRUD framework

## Why Piggy?
I created this app because of my personal affinity for finance. Being a recent graduate of both finance and accounting, I constantly think about the ways I am breaking out my daily, weekly, and monthly income. This app serves as a beginner's resource for those just now thinking about how finance plays into their lives and ways to improve financial habits.

## Contact
Created by [Nyaradzo Bere](http://www.linkedin.com/in/nyaradzo-bere)

## License
[View Here](License.txt)
