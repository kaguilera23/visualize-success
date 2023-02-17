const inquirer = require("inquirer")
const ctab = require("console.table")
const mysql = require("mysql2")


const menuQuestion = {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add an Employee", "Update Employee Role"]
}


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'lovebu&',
    database: 'team_db'
  },   console.log(`Connected to the classlist_db database.`)
);

inquirer.prompt(menuQuestion).then((answer) => {
    switch(answer.menu) {
        case "View All Departments":
          db.promise().query(`
          SELECT * FROM department`)
      .then(data => {
          console.table(data[0])
          })  
        break;

        case "View All Roles":
          db.promise().query(`
          SELECT * FROM role`)
      .then(data => {
          console.table(data[0])
          }) 
        break;

        case "View All Employees":
          db.promise().query(`
          SELECT * FROM employee`)
      .then(data => {
          console.table(data[0])
          }) 
        break;

        default:
            console.log("Help!")
    }
})

