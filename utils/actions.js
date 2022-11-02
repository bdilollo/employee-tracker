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
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    })
};

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
    })
};

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'New department name:'
        }
    ])
    .then((response) => {
        db.query(`INSERT INTO departments (name) VALUES ('${response.department}')`, function (err, results) {
            console.log(`${response.department} department added!`);
        })
    })
};

function addRole() {
    inquirer.prompt([
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
    .then((response) => {
        db.query(`INSERT INTO roles VALUES ('${response.title}', ${response.salary}, '${response.department})`,
        function (err, results) {
            console.log(`New ${response.title} role added!`);
        })
    })
};

function addEmployee() {
    inquirer.prompt([
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
            type: 'confirm',
            name: 'manager',
            message: "Who is this employee's manager? (if no manager, leave blank)"
        }
    ])
    .then((response) => {
        db.query(`INSERT INTO employees VALUES ('${response.first}', '${response.last}', '${response.role}, '${response.manager}')`,
        function(err, results) {
            console.log(`${response.first} ${response.last} added as new employee!`);
        })
    }
)};

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
    
    db.query(`SELECT @role_id := id FROM roles WHERE title = '${response.title}'; UPDATE employees SET role_id = @role_id WHERE first_name = '${response.first}' AND last_name = '${response.last}';`,
    function(err, results) {
        console.log(`Role for ${response.first} ${response.last} updated!`);
    })
    // .then((response) => {
    //     let { first, last } = response;
    // })
    // .then(() => {
    //     inquirer.prompt([
    //         {
    //             type: 'input',
    //             name: ''
    //         }
    //     ])
    // })
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
};