USE employeemanager;

INSERT INTO department (id, employeeName) VALUES
    (1, "IT"),
    (2, "HR");

INSERT INTO employeeRole (id, designation, salary, departmentID) VALUES
    (1, "HR emp", 100000, 2),
    (2, "HR Manager", 200000, 2),
    (3, "IT Manager", 200000, 1),
    (4, "IT Senior", 150000, 1),
    (5, "IT Junior", 100000, 1);

INSERT INTO employee (id, firstName, lastName, roleID, managerID) VALUES
(1, "John", "Doe", 2, null),
(2, "Jane", "Austin", 1, 1),
(3, "Rachel", "Cooper", 1, 1),
(4, "Ava", "Smith", 3, null),
(5, "Noah", "Williams", 4, 4),
(6, "Emily", "Johnson", 5, 4),
(7, "Jack", "Brown", 5, 4);