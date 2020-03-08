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
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Exit"
            ]
        })
        .then(function (answer) {
            if (answer.addToTracker === "View all employees") {
                viewAllEmployees();
            }
            else if (answer.addToTracker === "View all departments") {
                viewEmployeesByDepartment();
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
            else if (answer.addToTracker === "View Departments") {
                viewDepartments();
            }
            else if (answer.addToTracker === "Add Department") {
                addDepartments();
            }
            else if (answer.addToTracker === "View Roles") {
                viewRoles();
            }
            else if (answer.addToTracker === "Add Role") {
                addRole();
            }
            else {
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
    connection.query(`
    SELECT employee.*, role.department_id, department.dep_name FROM employee
JOIN role ON employee.role_id = role.id 
JOIN department ON department_id = department.id;
    `,
        function (err, data) {
            console.table(data)
            start()
        })
}

function addEmployee() {
    inquirer
        .prompt({
            [
                name: "addNewEmployee",
            type: "input",
            message: "First Name:",
            first_name: "first",
            last_name: "last"
            ],
            [
                name: "addNewEmplyRole"
            type: "inputf"
            message: ",
            title: "title",
            salary: "salary"
        });
    ).then(function (input) {
            var statement = connection.query(
                INSERT INTO employee(role_id, first_name, last_name) VALUES(2, "Karen", "Smith");
            INSERT INTO department(dep_name) VALUES("Engineering");
            INSERT INTO role(title, salary) VALUES("Engineer", 200000);




            "INSERT INTO department(dep_name) VALUES (?)", [input.departmentName], function (err) {
                start()
            })
    console.log(statement.sql)
})

}
//view employees by manager
function viewEmployeesByManger() {

}
