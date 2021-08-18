// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const writeFile = require('./utils/writeFile.js');

// Variables for fun
let funDisplay1 = true;
let funDisplay2 = true;

// TODO: Create a function to initialize app
const getBasicReadmeDetails = () => {

    console.log(`
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║              ╔═════════════════════════════════════════╗              ║                                         
    ║      (>'~')>-║ Welcome to the "Best" Readme Generator! ║-<('~'<)      ║
    ║              ╚═════════════════════════════════════════╝              ║                                       
    ╚═══════════════════════════════════════════════════════════════════════╝
    `);
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
            name: 'optionalConfirm',
            message: 'Do you want to create a more detailed Readme, with usage, contribution, installation, test, and or license information?',
            default: false
        },
        {
            type: 'confirm',
            name: 'installInstructionsCheck',
            message: 'Will this Readme include installation instructions?',
            default: false,
            when: ({ optionalConfirm }) => {
                if (optionalConfirm) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    ])
}

const getInstallInstructions = readmeData => {
    // Check if user wants to add install instructions, if not skip to next prompt 
    if (!readmeData.installInstructionsCheck) {
        return readmeData;
    }
    // Create an array to hold install instructions 
    if (!readmeData.installation) {
        readmeData.installation = [];
    }
    // Print array of current steps, if the array is not empty
    //  if(readmeData.install.length != 0 ) {
    //     console.log(`Current Instructions: ${readmeData.install}`);
    //  }
    if (funDisplay1) {
        console.log(`
    ╔═══════════════════════════════════════════════════════════════════════════════════════════╗
    ║              ╔═════════════════════════════════════════════════════════════╗              ║                                         
    ║      (>'~')>-║ You are about to be prompted for installation instructions! ║-<('~'<)      ║
    ║              ╚═════════════════════════════════════════════════════════════╝              ║                                       
    ╚═══════════════════════════════════════════════════════════════════════════════════════════╝
        `);

        funDisplay1 = false;
    }

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
        readmeData.installation.push(instructionsData);
        if (instructionsData.confirmAddInstructions) {
            console.log(`
              v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v  
            ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
             Instructions so far: 
             ${readmeData.installation.map(step => step.instruction)}                                                                                                                                                              
            ╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
              ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^  
            
           `);
            return getInstallInstructions(readmeData);
        } else {
            return readmeData;
        }
    })
}

const getOptionalDetails = readmeData => {

    // Check if the user wants a more detailed readme
    if (!readmeData.optionalConfirm) {
        return readmeData;
    }
    // Initalize object 
    //readmeData.detailed = "";
    console.log(`
    ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║              ╔════════════════════════════════════════════════════════════════════╗              ║                                         
    ║      (>'~')>-║These prompts are optional, but including a license is recommended! ║-<('~'<)      ║
    ║              ╚════════════════════════════════════════════════════════════════════╝              ║                                       
    ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
    `);

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'usageConfirm',
            message: 'Will this Readme include information on project usage?',
            default: false
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage information for the project: ',
            when: ({ usageConfirm }) => {
                if (usageConfirm) {
                    return true;
                } else {
                    return false;
                }
            }
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
            choices: ['AGPLv3', 'GPLv3', 'LGPLv3', 'MPL2.0', 'Apache2.0', 'MIT', 'BSL1.0', 'Unlicense'],
            when: ({ confirmLicense }) => {
                if (confirmLicense) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'contributionConfirm',
            message: 'Will this Readme include information on how to contribute to the project?',
            default: false
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'Enter contribution guidelines: ',
            when: ({ contributionConfirm }) => {
                if (contributionConfirm) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'testInstructionsCheck',
            message: 'Will this Readme include test instructions?',
            default: false
        }
    ]).then(optionalData => {
        // Merge old prompt object with detailed object info 
        readmeData = { ...readmeData, ...optionalData };
        return readmeData;
    });
}

const getTestInstructions = readmeData => {
    //  Check if user wants to add test instructions
    if (!readmeData.testInstructionsCheck) {
        return readmeData;
    }

    // Create an array to hold test instructions 
    if (!readmeData.tests) {
        readmeData.tests = [];
    }

    if (funDisplay2) {
        console.log(`
    ╔═══════════════════════════════════════════════════════════════════════════════════╗
    ║              ╔═════════════════════════════════════════════════════╗              ║                                         
    ║      (>'~')>-║ You are about to be prompted for test instructions! ║-<('~'<)      ║
    ║              ╚═════════════════════════════════════════════════════╝              ║                                       
    ╚═══════════════════════════════════════════════════════════════════════════════════╝
        `);
        funDisplay2 = false;
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
        readmeData.tests.push(instructionsData);
        if (instructionsData.confirmAddInstruction) {
            console.log(`
            v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v   v('~')v  
          ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
           Instructions so far: 
           ${readmeData.tests.map(step => step.instruction)}                                                                                                                                                              
          ╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
            ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^   ^(,~,)^  
          
         `);
            return getTestInstructions(readmeData);
        } else {
            return readmeData;
        }
    })
}


//Function call to initialize app
getBasicReadmeDetails()
    .then(readmeData => getInstallInstructions(readmeData))
    .then(readmeData => getOptionalDetails(readmeData))
    .then(readmeData => getTestInstructions(readmeData))
    .then(readmeData => generateMarkdown(readmeData))
    .then(readmeContent => writeFile(readmeContent));

