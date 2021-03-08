const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const queries = require('./queries')

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
    runInquiry();
  });

  const runInquiry = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?\n',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'View all employees by department',
                'View all employees by select manager',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'See total annual payroll',
                'Quit application'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    queries.viewEmp(connection, runInquiry);
                    break;

                case 'View all roles':
                    queries.chooseRoles(connection, runInquiry);
                    break;

                case 'View all departments':
                    queries.listDepts(connection, runInquiry);
                    break;

                case 'View all employees by department':
                    queries.empByDept(connection, runInquiry);
                    break;

                case 'View all employees by select manager':
                    queries.empByMgr(connection, runInquiry);
                    break;

                case 'Add a department':
                    queries.addDept(connection, runInquiry);
                    break;

                case 'Add a role':
                    queries.addRole(connection, runInquiry);
                    break;

                case 'Add an employee':
                    queries.addEmp(connection, runInquiry);
                    break;

                case 'Update an employee role':
                    queries.updateRole(connection, runInquiry);
                    break;

                case 'Add a department':
                    queries.addDept(connection, runInquiry);
                    break;

                case 'Add a role':
                    queries.addRole(connection, runInquiry);
                    break;

                case 'Quit application':
                    queries.endApp(connection)
                    break;
            }
        });
};
