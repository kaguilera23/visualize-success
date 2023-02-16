const inquirer = require("inquirer")
const ctab = require("console.table")

const menuQuestion = {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add an Employee", "Update Employee Role"]
}

inquirer.prompt(menuQuestion).then((answer) => {
    console.log(answer)
})