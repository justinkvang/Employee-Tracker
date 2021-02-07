USE employee_trackerDB;

INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 91000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 127000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 86000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 115000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 73000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 129000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 210000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Constance", "Wu", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Randall", "Park", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Daniel","Kim",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bruce", "Lee", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brenda", "Song", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jamie", "Chung", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lucy", "Liu", 2, 7);
