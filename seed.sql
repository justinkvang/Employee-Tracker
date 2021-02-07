USE employee_trackerDB;

INSERT INTO department (name)
VALUES ('Marketing'), ('Engineering'), ('Fiance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Planner, 45000, 1'), ('Marketing Lead, 65000, 1'), ('Jr Software Engineer, 55000, 2'), ('Lead Software Engineer, 90000, 2'), ('Accountant, 85000, 3'), ('Legal Lead, 75000, 4'), ('Lawyer, 100000, 4'); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jack', 'Black', 1, null), ('Constance', 'Wu', 3, null), ('Chris', 'Pratt', 4, 2), ('Donald', 'Glover', 6, null), ('Daniel', 'Kim', 2, 1), ('Randall', 'Park', 2, 1);