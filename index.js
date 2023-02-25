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
  message: "What is the name of your new department?"
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
          break;

        case "Add A Role":
          aar();
          break;

        case "Add an Employee":
          aae();
          break;

        case "Update Employee Role":
          uer();
          break;

        default:
            console.log("No Data Found, Please Make Your Selection Again")
    }
})}

function vad() {
  db.promise().query(`SELECT * FROM departments`)
    .then((data) => {
      console.table(data[0])
    })
}

function varoles() {
  db.promise().query(`SELECT roles.id, roles.title, roles.salary, departments.name FROM roles INNER JOIN departments ON roles.department_id=departments.id`)
    .then((data) => {
      console.table(data[0])
    }) 
}

function vae() {
  db.promise().query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, employees.manager_id as manager FROM employees INNER JOIN roles ON employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id`)
    .then(data => {
      console.table(data[0])
    })
}

function aad() {
  inquirer.prompt(addDepartmentQuestions).then((answers) => {
  db.promise().query(`INSERT INTO departments (name) VALUES (${JSON.stringify(answers.department)})`)
    .then(
      console.log("Your Department Has Been Added!")
    )    
  })
}

function aar() {
  // first get all of the current departments to enter as choices
  db.promise().query(`SELECT * FROM departments`)
    .then((data) => {
      const nameArray = data[0].map((kyle) => {
        return (`${kyle.id} ${kyle.name}`)
      })

      // ask question regarding new role
      inquirer.prompt([
        {
          type: "input",
          name: "role_name",
          message: "What is the name of the role?"
        }, 
        {
          type: "input",
          name: "role_salary",
          message: "What is the salary of the role?"
        },
        {
          type: "list",
          name: "role_department",
          message: "What department does the role belong to?",
          choices: nameArray
        }
      ]).then((answers) => {

        const {role_name, role_salary, role_department} =  answers

        // takes the role department id to enter into table instead of department name
        const sugar = role_department.split(" ")
        const titus = parseInt(sugar[0])

        db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (${JSON.stringify(role_name)}, ${role_salary}, ${titus})`)
          .then(
            console.log("Your Role Has Been Added!")
          )    
    })
  })
}

function aae() {
   // first get all of the current roles to enter as the role they belong to
   db.promise().query(`SELECT * FROM roles`)
     .then((data) => {
       const roleArray = data[0].map((kyle) => {
         return (`${kyle.id} ${kyle.title}`)
       })
 
       // ask question regarding new employee
       inquirer.prompt([
         {
           type: "input",
           name: "first_name",
           message: "What is the employee's first name?"
         }, 
         {
           type: "input",
           name: "last_name",
           message: "What is the employee's last name?"
         },
         {
           type: "list",
           name: "role_id",
           message: "What role does the employee belong to?",
           choices: roleArray
         }
       ]).then((answers) => {
 
         const {first_name, last_name, role_id} =  answers
         
         // takes the role department id to enter into table instead of department name
         const sugar = role_id.split(" ")
         const titus = parseInt(sugar[0])
         console.log(first_name, last_name, titus)
 
         db.promise().query(`INSERT INTO employees (first_name, last_name, role_id) VALUES (${JSON.stringify(first_name)}, ${JSON.stringify(last_name)}, ${titus})`)
           .then(
             console.log("Your Employee Has Been Added!")
           )    
     })
   })
}

function uer() {
  db.promise().query(`SELECT * FROM employees`)
  .then((data) => {
    console.log(data[0])
    const employeeArray = data[0].map((employee) => {
    console.log(employee.id, employee.first_name, employee.last_name)
    return (`${employee.id} ${employee.first_name} ${employee.last_name}`)
    })

    inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee are you updating?",
        choices: employeeArray
      }, 
      {
        type: "list",
        name: "roles",
        message: "What is the employee's new role?",
        choices: [
          "1 Sales Lead",
          "2 Lead Engineer",
          "3 Account Manager",
          "4 Legal Team Lead",
          "5 HR Manager"
        ]
      }
    ]).then((answers) => {
      const {employee, roles} = answers;
      const splitEmployeeId = employee.split(" ")
      const splitRoleId = roles.split(" ")
      const updateEmployee = parseInt(splitEmployeeId[0])
      const updateRoleId = parseInt(splitRoleId[0])
      console.log(updateEmployee)
      console.log(updateRoleId)

      db.promise().query(`UPDATE employees SET role_id = ${updateRoleId} WHERE id = ${updateEmployee}`).then(console.log("Employee has Been Updated!"))
    })
  })
}

menu();