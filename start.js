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
            if (answer.addViewUpdate === "Add Employee", "Add Department", "Add Role") {
                addMenu();
            } else if(answer.addViewUpdate === "View Employee", "View Department", "View Role") {
                viewMenu();
            } else if(answer.addViewUpdate === "Update Employee", "Update Department", "Update Role") {
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
                addEmployee();
            } else if (answer.addMenu === "Department") {
                addDepartment();
            } else if (answer.addMenu === "Role") {
                addRole();
            } else {
                connection.end();
            }
        });
  }

  function addEmployee() {
      inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter employee first name."
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter employee last name."
            },
            {
                name: "role",
                type: "list",
                message: "Select employee role.",
                choices: ["Intern", "Engineer", "Marketing Planner", "Manager"]
            },
            {
                name: "manager",
                type: "list",
                message: "Select employee manager name.",
                choices: ["Justin Vang", "Alayna X Vang"]
            }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                function(err) {
                    if (err) throw err;
                    console.log("You have successfully created a new employee!");
                    start();
                }
            );
        });
    }

  function addDepartment() {
        inquirer
          .prompt({
              name: "department",
              type: "list",
              message: "Select department to add.",
              choices: ["Marketing", "Engineering"]
          })
          .then(function(answer) {
              connection.query(
                  "INSERT INTO department SET ?",
                  {
                      name: answer.department
                  },
                  function(err) {
                      if (err) throw err;
                      console.log("Department has been added successfully!");
                      start();
                  }
              );
          });
    }