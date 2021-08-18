// Function to generate table of contents
const generateToc = data => {
  return` ## Table of Contents
  <ol>
    <li>[Description](#description)</li>
    <li>[Questions](#questions)</li>
  </ol>`
}

// Function to generate list of markdown content for the installation instructions and test instructions?
const generateInstallInstructions = instructions => {
  // Check to see if this object is actually included
  if (!instructions) {
    // Return nothing if there is nothing included
    return "";
  }
  const instructionSteps =  instructions.map(({ instruction }) => {
    return `<li>${instruction}</li> 
    `;
  }).join('');

  return `<h2 id="installation">Installation</h2>
  <ol>
    ${instructionSteps}
  </ol>
  `;
};

const generateTestInstructions = instructions => {
  // Check to see if this object is actually included
  if (!instructions) {
    // Return nothing if there is nothing included
    return "";
  }
  const instructionSteps =  instructions.map(({ instruction }) => {
    return `<li>${instruction}</li> 
    `;
  }).join('');

  return `<h2 id="tests">Tests</h2>
  <ol>
    ${instructionSteps}
  </ol>
  `;
};

const generateUsage = usage => {
  if (usage === "") {
    return; 
  }

  return `<h2 id="usage">Usage</h2>
  ${usage}
  `;
}

const generateContributing = contribution => {
  if (contribution === "") {
    return; 
  }

  return `<h2 id="contribution">Contribution</h2>
  ${contribution}
  `;
}


// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = license => {
  if (!license) {
    return "";
  }
  return `
  <image src='https://img.shields.io/badge/license-${license}-green.svg' />
  `;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = license => {
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
const renderLicenseSection = license => {
  if (!license) {
    return "";
  }
  return `
  <h2 id="license">License</h2>

  ${license} - Find out more about this license at: [https://choosealicense.com/licenses/${license}/](https://choosealicense.com/licenses/${license}/)`;
}

const generateContact = (github, email, contact) => {
  let contactInfo = `
  Made by: ${github}<br />
  Github Profile: https://github.com/${github}<br />`;

  if (email) {
    contactInfo = contactInfo + `Email: ${email}<br />`;
  }

  contactInfo = contactInfo + `${contact}`; 

  return contactInfo;
}

// TODO: Create a function to generate markdown for README
const generateMarkdown = data => {
  console.log(data);
  return `# ${data.title}
  ${renderLicenseBadge(data.license)}
  <h2 id="description">Description</h2>
  
  ${data.description}

  ${generateToc(data)}

  ${generateInstallInstructions(data.installation)}

  ${generateUsage(data.usage)}
 
  ${renderLicenseSection(data.license)}

  ${generateContributing(data.contributions)}
  
  ${generateTestInstructions(data.test)}


  <h2 id="questions">Questions</h2>
  ${generateContact(data.github, data.email, data.contact)}
  
`;
}
// for why generateContact does generateContact({github, email}) not work?
module.exports = generateMarkdown;
