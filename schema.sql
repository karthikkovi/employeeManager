DROP DATABASE IF EXISTS employeemanager;

CREATE DATABASE employeemanager;

USE employeemanager;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    employeeName VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employeeRole (
    id INT NOT NULL AUTO_INCREMENT,
    designation VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleID INT,
    managerID INT,
    FOREIGN KEY (roleID) REFERENCES employeeRole(id),
    FOREIGN KEY (managerID) REFERENCES employee(id),
    PRIMARY KEY (id)
);