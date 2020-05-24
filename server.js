// npm modules

const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

// connection

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "liverpool123#",
    database: "employeemanager"
});

connection.query = util.promisify(connection.query);
connect = util.promisify(connection.connect);

connection.connect(function (error) {
    if (error) throw error;
    else console.log("connected as id " + connection.threadId)
});

async function init() {
    // Intial prompt

    function userPrompt() {
        return inquirer.prompt({
            name: "viewAddUpdate",
            type: "list",
            message: "Would you like Add, view or update employees or deparments?",
            choices: ["Add", "View", "Update", "Exit"]
        })
    }

    let userRequirement = await userPrompt();

    switch (userRequirement.viewAddUpdate) {
        case "Add":
            addsomething();
            break;
        case "View":
            viewSomething();
            break;
        case "Update":
            updateSomething();
            break;
        default:
            console.log("Have a great day!")
            connection.end();
            process.exit();
            break;
    };
}

async function addsomething() {
    function userPrompt() {
        return inquirer.prompt({
            name: "viewAddUpdate",
            type: "list",
            message: "What would you like to add",
            choices: ["Employee", "Department", "Roles", "Exit"]
        })
    }

    let userRequirement = await userPrompt();

    switch (userRequirement.viewAddUpdate) {

        case "Employee":
            async function newEmployee() {
                return inquirer.prompt([{
                    name: "firstName",
                    message: "Enter the first name: "
                },
                {
                    name: "lastName",
                    message: "Enter the last name: "
                },
                {
                    name: "roleID",
                    message: "Enter the role ID: "
                },
                {
                    name: "managerID",
                    message: "Enter the manager ID, if none exists enter null: "
                }])
            }

            let newEmployeeDetails = await newEmployee();
            connection.query(`INSERT INTO employee(firstName, lastName, roleID, managerID) VALUES ("${newEmployeeDetails.firstName}", "${newEmployeeDetails.lastName}", "${newEmployeeDetails.roleID}", "${newEmployeeDetails.managerID}")`)

            console.table(await connection.query("SELECT * FROM employee"));
            break;

        case "Department":
            async function newDepartment() {
                return inquirer.prompt({
                    name: "departmentName",
                    message: "Enter the department name: "
                })
            }

            let newDepartmentDetails = await newDepartment();
            connection.query(`INSERT INTO department(departmentName) VALUES ("${newDepartmentDetails.departmentName}")`)

            console.table(await connection.query("SELECT * FROM department"));
            break;

        case "Roles":
        case "Employee":
            async function newRole() {
                return inquirer.prompt([{
                    name: "designation",
                    message: "Enter the designation: "
                },
                {
                    name: "salary",
                    message: "Enter the salary: "
                },
                {
                    name: "departmentID",
                    message: "Enter the department ID: "
                }])
            }

            let newRoleDetails = await newRole();
            connection.query(`INSERT INTO employeeRole(designation, salary, departmentID) VALUES ("${newRoleDetails.designation}", "${newRoleDetails.salary}", "${newRoleDetails.departmentID}")`)

            console.table(await connection.query("SELECT * FROM employeeRole"));
            break;

        default:
            break;
    }

    init();
}

async function viewSomething() {
    function userPrompt() {
        return inquirer.prompt({
            name: "viewAddUpdate",
            type: "list",
            message: "What would you like to view",
            choices: ["Employees", "Department", "Roles", "Exit"]
        })
    }

    let userView = await userPrompt();
    switch (userView.viewAddUpdate) {
        case "Employee":
            console.table(await connection.query("SELECT * FROM employee"));
            break;

        case "Department":
            console.table(await connection.query("SELECT * FROM department"));
            break;

        case "Roles":
            console.table(await connection.query("SELECT * FROM employeeRole"));
            break;

        default:
            break;
    }
    init()
}

async function updateSomething() {

    function userPrompt() {
        return inquirer.prompt([{
            name: "existingRole",
            message: "Enter the employee ID"
        },
        {
            name: "newRole",
            message: "Enter the new role ID"
        }])
    }
    console.table(await connection.query("SELECT * FROM employee"));

    let employeeDetails = await userPrompt()
    let existingEmployeeID = employeeDetails.existingRole;
    let newRoleID = employeeDetails.newRole;

    connection.query(`UPDATE employee SET roleID = "${newRoleID}" WHERE id = "${existingEmployeeID}"`);

    console.table(await connection.query("SELECT * FROM employee"));

}

init();