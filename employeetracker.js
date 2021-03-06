const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Daisy123!',
    database: 'employee_DB',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    viewDept();
  });

const viewEmp = () => {
  console.log('Selecting all employees...\n');
  connection.query('SELECT * FROM employee', (err, res) => {
    if(err) throw err;
    console.table(res);
    connection.end();
  });
};

const viewDept = () => {
  console.log('Selecting all departments...\n');
  connection.query('SELECT * FROM department', (err, res) => {
    if(err) throw err;
    console.table(res);
    viewRoles();
  });
};

const viewRoles = () => {
  console.log('Selecting all roles...\n');
  connection.query('SELECT * FROM role', (err, res) => {
    if(err) throw err;
    console.table(res);
    viewEmp();
  });
};

