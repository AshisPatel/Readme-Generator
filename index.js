// TODO: Include packages needed for this application
const inquirer = require('inquirer'); 
const fs = require('fs'); 
const generateMarkdown = require('./utils/generateMarkdown.js')
// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
const getReadmeDetails = () => {
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
                type: 'input',
                name: 'usage',
                message: 'Enter usage information for the project: '
            },
            {
                type: 'input',
                name: 'contributions',
                message: 'Enter contribution guidelines: '
            },
            {
                type: 'confirm',
                name: 'installInstructionsCheck', 
                message: 'Will this Readme include installation instructions?', 
                default: false 
            },
            {
                type: 'confirm',
                name: 'testInstructionsCheck',
                message: 'Will this Readme include test instructions?',
                default: false
            }

        ])
}

 const promptInstallInstructions = readmeData => {
    // Check if user wants to add install instructions, if not skip to next prompt 
    if (!readmeData.installInstructionsCheck) {
        return readmeData; 
    }
    // Create an array to hold install instructions 
    if(!readmeData.install) {
        readmeData.install = []; 
    }
     // Print array of current steps, if the array is not empty
    //  if(readmeData.install.length != 0 ) {
    //     console.log(`Current Instructions: ${readmeData.install}`);
    //  }
    
    return inquirer.prompt([
        {
            type: 'input', 
            name: 'instruction',
            message: 'Enter installation instruction step:' 
        },
        {
            type: 'confirm',
            name: 'confirmAddInstructions',
            message: 'Would you like to add more instructions?', 
            default: false
        }
    ]).then(instructionsData => {
        readmeData.install.push(instructionsData); 
        if (instructionsData.confirmAddInstructions) {
            return promptInstallInstructions(readmeData); 
        } else {
            return readmeData; 
        }
    })
 }

 const promptTestInstructions = readmeData => {
    //  Check if user wants to add test instructions
    if(!readmeData.testInstructionsCheck) {
        return readmeData; 
    }

    // Create an array to hold test instructions 
    if(!readmeData.test) {
        readmeData.test = []; 
    }

    // Print array of current steps, if the array is not empty
    // if (readmeData.test.length != 0) {
    //     console.log(`Current Instructions: ${readmeData.test}`);
    // }
   

    return inquirer.prompt([
        {
            type: 'input', 
            name: 'instruction',
            message: 'Enter test instruction step:' 
        },
        {
            type: 'confirm',
            name: 'confirmAddInstruction',
            message: 'Would you like to add more instructions?', 
            default: false
        }
    ]).then(instructionsData => {
        readmeData.test.push(instructionsData); 
        if (instructionsData.confirmAddInstruction) {
            return promptTestInstructions(readmeData); 
        } else {
            return readmeData; 
        }
    })
 }


// Function call to initialize app
getReadmeDetails()
    .then(readmeData => promptInstallInstructions(readmeData))
    .then(readmeData => promptTestInstructions(readmeData))
    .then(readmeData => generateMarkdown(readmeData));  

