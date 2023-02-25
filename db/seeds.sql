INSERT INTO departments (name) 
VALUES
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, "Sales Lead", 100000, 4),
(2, "Lead Engineer", 150000, 1), 
(3, "Account Manager", 160000, 2),
(4, "Legal Team Lead", 190000, 3);

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES
(1, "John", "Doe", 1),
(2, "Kristen", "Collins", 2),
(3, "Jane", "Rodriguez", 3),
(4, "Kyle", "Feener", 4);