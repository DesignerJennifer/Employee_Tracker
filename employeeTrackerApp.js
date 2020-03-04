var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // The port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "4899",

    // The database
    database: "employees_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function: prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "addToTracker",
            type: "list",
            message: "What do you want to do?",
            choices: [
                "View All Employees",
                "View Employees by Department",
                "View Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View Departments",
                "Add Department",
                "Remove Department",
                "View Roles",
                "Add Role",
                "Remove Role",
                "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.addToTracker === "View All Employees") {
                viewAllEmployees();
            }
            else if (answer.addToTracker === "View Employees by Department") {
                viewEmployeesByDepartment()
            }
            else if (answer.addToTracker === "View Employees by Manager") {
                viewEmployeesByManger();
            }
            else if (answer.addToTracker === "Add Employee") {
                addEmployee();
            }
            else if (answer.addToTracker === "Remove Employee") {
                removeEmployee();
            }
            else if (answer.addToTracker === "Update Employee Role") {
                updateEmployeeRole();
            }
            else if (answer.addToTracker === "Update Emploee Manager") {
                updateEmployeeManager();
            }
            else if (answer.addToTracker === "Update Emploee Manager") {
                updateEmployeeManager();
            }


        } else {
            connection.end();
        }
        });
}

// view all employees
function viewAllEmployees() {
    connection.query(`
SELECT employee.id, employee.first_name, employee.last_name, role.title,
concat_ws(' ',employee2.first_name , employee2.last_name) manager
FROM employee   
LEFT JOIN role ON employee.role_id=role.id
LEFT JOIN employee employee2 ON  employee2.id=employee.manager_id;
    `, function (err, data) {
        console.table(data)
        start()
    })
}

//view employees by department
function viewEmployeesByDepartment() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What department do you want to add?",
                name: "departmentName"
            }
        ]
    ).then(function (input) {
        var statement = connection.query("INSERT INTO department(dep_name) VALUES (?)", [input.departmentName], function (err) {
            start()
        })
        console.log(statement.sql)
    })

}
//view employees by manager
function viewEmployeesByManger() {

}
