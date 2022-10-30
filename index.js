const inquirer = require('inquirer');
const mysql = require('mysql2');

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'workplace_db'
//     },
//     console.log('connected to the workplace_db database')
// );

inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role'
        ]
    }
])
.then((response) => {
    console.log(response.action)
});