INSERT INTO department (id, name) 
VALUES
(1, "Engineering"),
(2, "Finance"),
(3, "Legal"),
(4, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "Sales Lead", 100000, 4),
(2, "Lead Engineer", 150000, 1), 
(3, "Account Manager", 160000, 2),
(4, "Legal Team Lead", 190000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "John", "Doe", 1, 7),
(2, "Sugar", "Bear", 2, 7),
(3, "Titus", "Boy", 3, 7),
(4, "Kyle", "Feener", 4, 7);