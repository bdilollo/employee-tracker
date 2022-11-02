const inquirer = require('inquirer');
const mysql = require('mysql2');
const action = require('./utils/actions');


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
};

initialPrompt();