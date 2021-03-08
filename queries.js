const consoleTable = require('console.table');
const inquirer = require('inquirer');
const Department = require(/lib/department);
const Role = require(/lib/role);
const Employee = require(/lib/employee);

const endApp = (connection) => {
    connection.end(connection)
}

const viewEmp = (connection, cb) => {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(e.first_name, ' ',e.last_name AS Manager ";
    query +=
        'FROM employee ';
    query +=
        'INNER JOIN role on role.id = employee.role_id ';
    query +=
        'INNER JOIN department on department.id = role.department_id ';
    query +=
        'LEFT JOIN employee e on employee.manager_id = e.id ';
    query +=
        'ORDER BY employee.id ';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('\nList of all employess\n');
        console.table(res);
        if(cb) {
            cb()
        }
    })
};

const chooseMgr = (connection, cb) => {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title';
    query +=
        'FROM employee';
    query +=
        'INNER JOIN role on role.id = employee.role_id';
    query +=
        'INNER JOIN department on department.id = role.department_id';
    query +=
        'LEFT JOIN employee e on employee.manager_id = e.id';
    query +=
        'ORDER BY employee.id';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('\nList of employees for selected manager\n');
        console.table(res);
        if(cb){
            cb()
        }
    })
};

const chooseDept = (connection, cb) => {
    let query = 'SELECT department.department_name AS Department, employee.first_name, employee.last_name';
    query +=
        'FROM employee JOIN role ON employee.role_id = role.id';
    query +=
        'JOIN department ON role.department_id = department.id';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('\nList of departments\n')
        console.table(res);
        if(cb) {
            cb()
        }
    })
};

const chooseRoles = (connection, cb) => {
    let query = 'SELECT role.title AS Title, employee.id, employee.first_name, employee.last_name';
    query +=
        'FROM employee';
    query +=
        'JOIN role ON employee.role_id = role.id';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('\nList of all roles and employees in roles\n')
        console.table(res);
        if (cb) {
            cb()
        }
    })
};

const empByDept = (connection, cb) => {
    console.log('All employess organied by department\n');
    let query = 'SELECT first_name, last_name, title, department_name';
    query +=
        'FROM employee';
    query +=
        'INNER JOIN role ON role.id = employee.role_id';
    query +=
        'INNER JOIN department ON department.id = employee.department_id';
    query +=
        'ORDER BY department_name';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\nList of employees by department')
        console.table(res);
        if(cb) {
            cb()
        }
    })
};

const empByMgr = (connection, cb) => {
    console.log('\nHere is a list of managers to choose from')
    let query = "SELECT employee.manager_id, CONCAT(e.first_name, '' ,e.last_name) AS Manager ";
    query +=
        'FROM employee';
    query +=
        'INNER JOIN role on role.id = employee.role_id';
    query +=
        'INNER JOIN department on department.id = role.department_id';
    query +=
        'LEFT JOIN employee e on employee.manager_id = e.id';
    query +=
        'GROUP BY employee.manager_id';
    connection.query(query, (err,res) => {
        if(err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(res[i].manager_id, res[i].Manager);
        };
        inquirer    
            .prompt({
                name: 'action',
                type: 'number',
                choices() {
                    const managerArray = [];
                    res.forEach((item) => {
                        managerArray.push(item.manager_id, item.Manager);
                    })
                    console.log('\n');
                    return managerArray
                },
                message: 'Choose a manager by their number',
            })
            .then((answer) => {
                let query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee";
                query +=
                    'INNER JOIN role on role.id = employee.role_id';
                query +=
                    'INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id';
                query +=
                    'WHERE employee.manager_id = ?';
                connection.query(query, answer.action, (err, res) => {
                    if(err) throw err;
                    console.log('\nShowing all employees for selected manager');
                    console.table(res);
                    if(cb){
                        cb()
                    }
                })
            });
    });
};

const addDept = (connection, cb) => {
    inquirer
        .prompt({
            name: 'newDeptName',
            type: 'input',
            message: 'What is the name of the new department you are adding?',
        })
        .then((answer) => {
            let newDept = new Department(answer.newDeptName)
            console.log(newDept.name);
            connection.query(
                'INSERT INTO department (department_name) VALUES (?)', newDept.name,
                (err) => {
                    if(err) throw err;
                    console.log('\nNew departmetn created successfully\n');
                    listDepts(connection, cb);
                }
            );
        });
};

const listDepts = (connection, cb) => {
    connection.query('SELECT * FROM department', (err, res) => {
        if(err) throw err;
        console.log('\nList of all departments\n');
        console.table(res);
        if(cb) {
           cb()
        }
    });
};

const listRoles = (connection, cb) => {
    connection.query('SELECT id, title, salary FROM role', (err, res) => {
        if(err) throw err;
        console.log('\nListing all roles in company\n');
        console.table(res);
        if(cb){
            cb()
        }
    });
};

const addRole = (connection, cb) => {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the new role?'
            },
            {
                name: 'salary',
                type: 'number',
                message: 'What ist he salary for this role?'
            },
            {
                name: 'department',
                type: 'number',
                choices() { listDepts(connection) },
                message: 'Enter the ID of the department this role will be in.'
            }
        ])
        .then((answer) => {
            let newRole = new Role(answer.title, answer.salary, answer.department)
            const query = 'INSERT INTO role SET ?';

            connection.query(query, {
                title: newRole.title,
                salary: newRole.salary,
                department_id = newRole.department
        },
            (err, res) => {
                if(err) throw err;
                console.log('\nNew role created successfully\n');
                console.table(res);
                listRoles(connection,cb);
            }
        );
    });
};

const updateRole = (connection, cb) => {
    inquirer
        .prompt([
            {
                name: 'employee',
                type: 'number',
                choices()
            }
        ])
}