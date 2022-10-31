const inquirer = require('inquirer');
const mysql = require('mysql2');
const action = require('./utils/actions');
// const { allowedNodeEnvironmentFlags } = require('process');

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'workplace_db'
//     },
//     console.log('connected to the workplace_db database')
// );

function initialPrompt() {
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
        handleResponse(response);
    });
};

function handleResponse(response) {
    switch(response.action) {
        case 'View all departments':
            action.viewDepartments();
            break;
        case 'View all roles':
            action.viewRoles();
            break;
        case 'View all employees':
            action.viewEmployees();
            break;
        case 'Add a department':
            action.addDepartment();
            break;
        case 'Add a role':
            action.addRole();
            break;
        case 'Add an employee':
            action.addEmployee();
            break;
        case 'Update employee role':
            action.updateEmployee();
            break;
    }
    promptReturn();
};


function promptReturn() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'return',
            message: 'Would you like to select another action?',
            choices: [
                'yes',
                'no'
            ]
        }
    ])
    .then((response) => {
        if (response.return == 'yes') {
            initialPrompt();
        }
    });
}

initialPrompt();