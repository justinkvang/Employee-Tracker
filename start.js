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
            message: "What would you like to do?",
            choices: ["Add Employee", "Add Department", "Add Role",
                     "View Employee", "View Department", "View Role",
                    "Update Department", "Update Role", "Exit"]
        })
        .then(function(answer) {
            if (answer.addViewUpdate === "Add Employee") {
                addEmployee();
            } else if(answer.addViewUpdate === "Add Department") {
                addDepartment();
            } else if(answer.addViewUpdate === "Add Role") {
                addRole();
            } else if(answer.addViewUpdate === "View Employee") {
                viewEmployee();
            } else if(answer.addViewUpdate === "View Department") {
                viewDepartment();
            } else if(answer.addViewUpdate === "View Role") {
                viewRole();
            } else if(answer.addViewUpdate === "Update Department") {
                updateDepartment();
            } else if(answer.addViewUpdate === "Update Role") {
                updateRole();
            } else if (answer.addViewUpdate === "Exit") {
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
              type: "input",
              message: "Enter department name.",
          })
          .then(function(answer) {
              connection.query(
                  "INSERT INTO department SET ?",
                  {
                      name: answer.department
                  },
                  function(err) {
                      if (err) throw err;
                      console.log("You have successfully added a department!");
                      start();
                  }
              );
          });
    }

  function addRole() {
      inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter employee role."
            },
            {
                name: "salary",
                type: "input",
                message: "Enter employee salary."
            }
        ])
        .then(function(answer){
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary
                },
                function(err) {
                    if (err) throw err;
                    console.log("You have successfully added a role!");
                    start();
                }
            );
        });
    }
  
  function viewEmployee() {
      connection.query("SELECT * FROM employee", function(err, res) {
          if (err) throw err;
          console.table(res);
          start();
      });
  }

  function viewDepartment() {
      connection.query("SELECT * FROM department", function(err, res) {
          if (err) throw err;
          console.table(res);
          start();
      });
  }

  function viewRole() {
      connection.query("SELECT * FROM role", function(err, res) {
          if (err) throw err;
          console.table(res);
          start();
      });
  }

  function updateRole() {
      connection.query("SELECT * FROM employee", function(err, res) {
          if (err) throw err;

          inquirer
            .prompt([
                {
                    name: "employees",
                    type: "rawlist",
                    choices: function() {
                        var employeesArray = [];
                        for (var i = 0; i < res.length; i++) {
                            employeesArray.push(res[i].first_name + " " + res[i].last_name);
                        }
                        return employeesArray;
                    },
                    message: "What employee would you like to update?"
                },
                {
                    name: "updateWhat",
                    type: "list",
                    message: "Select what you want to update.",
                    choices: ["Role", "Manager"]
                }
            ])
            .then(function(answer) {
                if (answer.updateWhat === "Role") {
                    newRole();
                    } else if (answer.updateWhat === "Manager") {
                    inquirer
                        .prompt({
                            name: "newLastName",
                            type: "input",
                            message: "Enter new last name."
                        })
                    } 
            });
      })
  }