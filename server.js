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
    // 
}