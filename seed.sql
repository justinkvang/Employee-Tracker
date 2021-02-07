USE employee_trackerDB;

INSERT INTO department (name)
VALUES ('Marketing'), ('Engineering'), ('Fiance'), ('Legal'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Planner', 45000, 1), ('Software Engineer', 87000, 2), ('Accountant', 91000, 3), ('Lawyer', 100000, 4), ('Sales Person', 58000, 5); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Constance', 'Wu', 1, null), ('Chris', 'Pratt', 1, 1), ('Daniel', 'Kim', 3, 2), ('Randall', 'Park', 5, 2);