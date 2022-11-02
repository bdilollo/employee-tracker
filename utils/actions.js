const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'workplace_db',
        multipleStatements: true
    },
    console.log('connected to the workplace_db database')
);

function viewDepartments() {
    db.query('SELECT * FROM departments',
    function (err, results) {
        console.table(results);
    })
};

function viewRoles() {
    db.query(
        `SELECT roles.title AS Title, roles.id AS ID, roles.salary AS Salary, departments.name AS Department
        FROM roles 
        JOIN departments ON roles.department_id = departments.id;`,
    function (err, results) {
        console.table(results);
    })
};

function viewEmployees() {
    db.query(
        `SELECT employees.id AS ID, CONCAT(employees.first_name, ' ', employees.last_name) AS Name, roles.title AS Title, departments.name AS Department, roles.salary AS Salary, employees.manager_id 
        FROM employees 
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id`,
    function (err, results) {
        console.table(results);
    })
};

async function addDepartment() {
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'New department name:'
        }
    ])
    db.query(
        `INSERT INTO departments (name) VALUES ('${response.department}';`,
    function (err, results) {
        console.log(`${response.department} department added!`);
    })
};

async function addRole() {
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'New role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'New role salary:'
        },
        {
            type: 'input',
            name: 'department',
            message: 'In which department is this role located?'
        }
    ])
    db.query(
        `SELECT @dept_id := id FROM departments WHERE name = '${response.department}';
        INSERT INTO roles (title, salary, department_id) VALUES ('${response.title}', ${response.salary}, @dept_id)`,
    function (err, results) {
        console.log(`New ${response.title} role added!`);
    })
};

async function addEmployee() {
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'New employee first name:'
        },
        {
            type: 'input',
            name: 'last',
            message: 'New employee last name:'
        },
        {
            type: 'input',
            name: 'role',
            message: 'New employee role:'
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is this employee's manager? (if no manager, leave blank)"
        }
    ])
    let nameArr = (response.manager).split(' ');
    let managerFirst = nameArr[0];
    let managerLast = nameArr[1];
    db.query(
        `SELECT @role_id := id FROM roles WHERE title = '${response.role}';
        SELECT @manager_id := id FROM employees WHERE first_name = '${managerFirst}' AND last_name = '${managerLast}';
        INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${response.first}', '${response.last}', @role_id, @manager_id)`,
    function(err, results) {
        console.log(`${response.first} ${response.last} added as new employee!`);
    })
};

async function updateEmployee() {
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'First name of employee you want to update:'
        },
        {
            type: 'input',
            name: 'last',
            message: 'Last name of employee you want to update:'
        },
        {
            type: 'input',
            name: 'title',
            message: 'New Role Title:'
        }
    ]);
    db.query(
        `SELECT @role_id := id FROM roles WHERE title = '${response.title}';
        UPDATE employees SET role_id = @role_id WHERE first_name = '${response.first}' AND last_name = '${response.last}';`,
    function(err, results) {
        console.log(`Role for ${response.first} ${response.last} updated!`);
    })
};


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee,
};