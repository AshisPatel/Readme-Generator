// TODO: Include packages needed for this application
const inquirer = require('inquirer'); 
const fs = require('fs'); 
// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
const getProjectDetails = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter your project title (Required): ',
                validate: titleConfirm => { 

                    if(titleConfirm) {
                        return true;
                    } else {
                        console.log('Please provide a Project Title!'); 
                        return false; 
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter a description for the project: '
            },
            {
                // Break code here to enter a new prompt to generate an array for steps for installation... 
                type: 'input',
                name: 'installation',
                message: 'Enter installation instructions for the project:'
            },
            {
                type: 'input',
                name: 'usage',
                message: 'Enter usage information for the project:'
            },
            {
                type: 'input',
                name: 'contributions',
                message: 'Enter contribution guidelines'
            },
            {
                // Break code here to enter a new prompt to generate an array for testing steps... 
                type: 'input',
                name: 'test',
                message: 'Enter test instructions'
            }

        ])
}


// Function call to initialize app
getProjectDetails().then(projectData => console.log(projectData)); 

