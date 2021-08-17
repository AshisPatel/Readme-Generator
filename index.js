// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const writeFile = require('./utils/writeFile.js');

// TODO: Create a function to initialize app
const getBasicReadmeDetails = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github username (Required):',
            validate: githubConfirm => {
                if (githubConfirm) {
                    return true;
                } else {
                    console.log('Please provide your Github username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'emailConfirm',
            message: 'Would you like to include your email?',
            default: false
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email:',
            validate: emailInputConfirm => {
                if (emailInputConfirm) {
                    return true;
                } else {
                    console.log('Please provide your email!');
                }
            },
            when: ({ emailConfirm }) => {
                if (emailConfirm) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'contact',
            message: 'Enter how you would like to be contacted regarding this project:'
        },
        {
            type: 'input',
            name: 'title',
            message: 'Enter your project title (Required): ',
            validate: titleConfirm => {

                if (titleConfirm) {
                    return true;
                } else {
                    console.log('Please provide a Project Title!');
                    return false;
                }

            }
        },
        {
            type: 'confirm',
            name: 'tocCheck',
            message: 'Do you want to add a table of contents?',
            default: false
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description for the project (Required): ',
            validate: descriptionConfirm => {
                if (descriptionConfirm) {
                    return true;
                } else {
                    console.log('Please provide a project description!');
                }
            }
        },
        {
            type: 'confirm',
            name: 'detailedConfirm',
            message: 'Do you want to create a more detailed Readme, with usage, contribution, installation, test, and or license information?',
            default: false
        }
    ])
}

const getDetailedReadmeDetails = readmeData => {

    // Check if the user wants a more detailed readme
    if (!readmeData.detailedConfirm) {
        return readmeData;
    }
    // Initalize object 
    //readmeData.detailed = "";

    return inquirer.prompt([
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
        },
        {
            type: 'confirm',
            name: 'confirmLicense',
            message: 'Would you like to add a license for this project?'
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Choose a license for the project:',
            choices: ['agpl-3', 'gpl-3', 'lgpl-3', 'mpl-2.0', 'apache-2.0', 'mit', 'bsl-1.0', 'unlicense'],
            when: ({ confirmLicense }) => {
                if (confirmLicense) {
                    return true;
                } else {
                    return false;
                }
            }
        }

    ]).then(detailedInfo=> {
        // Merge old prompt object with detailed object info 
        readmeData = {...readmeData, ...detailedInfo};
        return readmeData; 
    });
}

const promptInstallInstructions = readmeData => {
    // Check if user wants to add install instructions, if not skip to next prompt 
    if (!readmeData.installInstructionsCheck) {
        return readmeData;
    }
    // Create an array to hold install instructions 
    if (!readmeData.install) {
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
    if (!readmeData.testInstructionsCheck) {
        return readmeData;
    }

    // Create an array to hold test instructions 
    if (!readmeData.test) {
        readmeData.test = [];
    }

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
getBasicReadmeDetails()
    .then(readmeData => getDetailedReadmeDetails(readmeData))
    .then(readmeData => promptInstallInstructions(readmeData))
    .then(readmeData => promptTestInstructions(readmeData))
    .then(readmeData => generateMarkdown(readmeData))
    .then(readmeContent => writeFile(readmeContent));

