const inquirer = require("inquirer")
const ctab = require("console.table")
const mysql = require("mysql2")


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'lovebu&',
    database: 'team_db'
  },   console.log(`Connected to the classlist_db database.`)
);

const menuQuestion = {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add an Employee", "Update Employee Role"]
}

const addDepartmentQuestions = {
  type: "input",
  name: "department",
  message: "What is the name of your new department? "
}

function menu() {
  inquirer.prompt(menuQuestion).then((answer) => {
    switch(answer.menu) {
        case "View All Departments":
          vad();  
        break;

        case "View All Roles":
          varoles();
        break;

        case "View All Employees":
          vae();
        break;

        case "Add A Department":
          aad();

        default:
            console.log("No Data Found, Please Make Your Selection Again")
    }
})}

function vad() {
  db.promise().query(`SELECT * FROM department`)
    .then((data) => {
      console.table(data[0])
    })
}

function varoles() {
  db.promise().query(`SELECT * FROM role`)
    .then((data) => {
      console.table(data[0])
    }) 
}

function vae() {
  db.promise().query(`SELECT * FROM employee`)
    .then(data => {
      console.table(data[0])
    })
}

function aad() {
  inquirer.prompt(addDepartmentQuestions).then((answers) => {
    console.log(answers)
    console.log()
  db.promise().query(`INSERT INTO department (name) VALUES (${JSON.stringify(answers.department)})`)
    .then(
      console.log("Your Department Has Been Added!")
    )    
  })

}

menu();