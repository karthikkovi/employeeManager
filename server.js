// npm modules

const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

// connection

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
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
            message: "Would you like Add, view or update a new employees or deparments?",
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

async function addsomething(){
    console.log("something will be added");
    init()
} 

async function viewSomething(){
    console.log("something will be Viewed");
    init()
}

async function updateSomething(){
    console.log("something will be Updated");
    init()
}

init();