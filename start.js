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
                    "Update Employee", "Exit"]
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
            } else if(answer.addViewUpdate === "Update Employee") {
                updateEmployee();
            }  else if (answer.addViewUpdate === "Exit") {
                connection.end();
            }
        });
  }

var roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role", function(err,res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
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
                choices: selectRole()
            },
            {
                name: "manager",
                type: "list",
                message: "Select employee manager name.",
                choices: selectManager()
            }
        ])
        .then(function(answer) {
            var roleId = selectRole().indexOf(answer.role) + 1
            var managerId = selectManager().indexOf(answer.choice) + 1
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId,
                    manager_id: managerId
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
              message: "What department would you like to add?",
          })
          .then(function(answer) {
              connection.query(
                  "INSERT INTO department SET ? ",
                  {
                      name: answer.department
                  },
                  function(err) {
                      if (err) throw err;
                      console.table(res);
                      start();
                  }
              );
          });
    }

  function addRole() {
      connection.query("SELECT role.title AS title, role.salary AS salary FROM role", function(err, res) {
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
            )
        });
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

  function updateEmployee() {
        connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", 
        function(err, res) {
         if (err) throw err
         console.log(res)
        
         inquirer
            .prompt([
              {
                name: "lastName",
                type: "rawlist",
                choices: function() {
                  var lastName = [];
                  for (var i = 0; i < res.length; i++) {
                    lastName.push(res[i].last_name);
                  }
                  return lastName;
                },
                message: "What is the Employee's last name? ",
              },
              {
                name: "role",
                type: "rawlist",
                message: "What is the Employees new title? ",
                choices: selectRole()
              },
          ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
            {
              last_name: val.lastName
               
            }, 
            {
              role_id: roleId
               
            }, 
            function(err){
                if (err) throw err
                console.table(val);
                start();
            })
      
        });
      });
    
  }