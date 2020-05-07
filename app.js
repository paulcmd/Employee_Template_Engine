const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const express = require("express");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const app = express();
const PORT = 3000;

// Empty employee array
const employeeArray = [];

//___________generate an employee from the list______________________________________
function generateEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeRole",
            message: "Pick a team member to add : ",
            choices: [
                "Manager", "Engineer", "Intern", "Exit"
            ]
        }
    ]).then(answers => {
        if (answers.employeeRole === "Manager") {
            generateManager();

        } else if (answers.employeeRole === "Engineer") {
            generateEngineer();

        } else if (answers.employeeRole === "Intern") {
            generateIntern();

        } else {
            let html = render(employeeArray);

            fs.writeFile(outputPath, html, (err) => {
                if (err) throw err;
                console.log("The file has been created!");
            });
        }
    });
}

function generateIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What school does the employee attend?",
            name: "school"
        }
    ]).then(answers => {
        let employee = new Intern(answers.name, answers.id, answers.email, answers.school);
        console.log(employee);
        employeeArray.push(employee);
        generateEmployee();
    })
}

function generateManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the employee's office number?",
            name: "officeNumber"
        }
    ]).then(answers => {
        let employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        console.log(employee);
        employeeArray.push(employee);
        generateEmployee();
    })
}

function generateEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the employee's github username?",
            name: "github"
        }
    ]).then(answers => {
        let employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
        console.log(employee);
        employeeArray.push(employee);
        generateEmployee();
    })
}

generateEmployee();
