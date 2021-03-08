DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

INSERT INTO department (department_name)
VALUES ('Member Service');

INSERT INTO department (department_name)
VALUES ('Technology');

INSERT INTO department (department_name)
VALUES ('Operations');

INSERT INTO department (department_name)
VALUES ('Risk Management');


 -- adding roles within departments --
INSERT INTO role (title, salary, department_id)
VALUES 
  ('Relationship Advisor', 33000 , 1),
  ('Electronic Services Advisor', 36000 , 1),
  ('IT Support Specialist', 41000, 2),
  ('Software Engineer', 80000, 2),
  ('Risk Analyst', 50000, 4),
  ('Operations Leader', 80000, 3),
  ('Operations Support Specialist', 40000, 3);


INSERT INTO employee (first_name, last_name, manager_id, role_id, department_id)
VALUES 
  ('Kelly', 'Kapoor', 3, 1, 1),
  ('Jim', 'Halpert', 3, 2, 1),
  ('Michael', 'Scott', 3, 6, 3),
  ('Dwight', 'Schrute', 4, 4, 2),
  ('Creed', 'Bratton', 7, 7, 3),
  ('Meredith', 'Palmer', 3, 5, 4),
  ('Pam', 'Beesly', 7, 5, 4);