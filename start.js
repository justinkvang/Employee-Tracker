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
            choices: ["Add", "View", "Update"]
        })
        .then(function(answer) {
            if (answer.addViewUpdate === "Add") {
                addMenu();
            } else if(answer.addViewUpdate === "View") {
                viewMenu();
            } else if(answer.addViewUpdate === "Update") {
                updateMenu();
            } else {
                connection.end();
            }
        });
  }
  