const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
​const app = express();
const PORT = 3000;

const employeeArray = [];

function pickEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeRole",
            message: "Pick a team member to add : ",
            choices: [
                "Manager", "Engineer", "Intern", "Done"
            ]
        }
    ]).then(answers => {
        if (answers.employeeRole === "Manager") {
            generateIntern();
        } else if (answers.employeeRole === "Engineer") {
            generateManager();
        } else if (answers.employeeRole === "Intern") {
            generateIntern();
        } else {
            let html = render(employeeArray);

            fs.writeFile(outputPath, html, (err) => {
                if (err) throw err;
                console.log("The file was written");
            });
        }
    });
}

function generateIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee email?",
            name: "email"
        },
        {
            type: "input",
            message: "What school does the employee attend?",
            name: "school"
        }
    ]).then(answers => {
        let employee = new Intern(answers.name, answers.id, answers.email, answers.school);
        employeeArray.push(employee);
        employeeType();
    })
}

function generateManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the employee's office number?",
            name: "office"
        }
    ]).then(answers => {
        let employee = new Manager(answers.name, answers.id, answers.email, answers.office);
        employeeArray.push(employee);
        pickEmployee();
    })
}

function generateEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the employee's github username?",
            name: "github"
        }
    ]).then(answers => {
        let employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employeeArray.push(employee);
        pickEmployee();
    })
}

pickEmployee();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
