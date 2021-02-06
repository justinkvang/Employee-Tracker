var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "rootroot",
    database: "employee_trackerDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  });

  function start() {
      inquirer
        .prompt({
            name: "addViewUpdate",
            type: "list",
            message: "Would you like to add, view, or update an employee|department|role?",
            choices: ["Add Employee", "Add Department", "Add Role",
                     "View Employee", "View Department", "View Role",
                     "Update Employee", "Update Department", "Update Role"]
        })
        .then(function(answer) {
            if (answer.addViewUpdate === ("Add Employee", "Add Department", "Add Role")) {
                addMenu();
            } else if(answer.addViewUpdate === ("View Employee", "View Department", "View Role")) {
                viewMenu();
            } else if(answer.addViewUpdate === ("Update Employee", "Update Department", "Update Role")) {
                updateMenu();
            } else {
                connection.end();
            }
        });
  }

  function addMenu() {
      inquirer
        .prompt({
            name: "addMenu",
            type: "list",
            message: "What item would you like to add?",
            choices: ["Employee", "Department", "Role"]
        })
        .then(function(answer) {
            if (answer.addMenu === "Employee") {

            }
        })
  }