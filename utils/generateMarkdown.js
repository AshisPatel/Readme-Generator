// Function to capitlize the first letter of a word
const capitalizeFirst = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


// Function to generate table of contents
const generateToc = data => {
  // Check to see if the user wants a ToC
  if(!data.tocCheck) {
    return ""; 
  }
  // Grab all keys in the data object as an array
  const optionalContent = Object.keys(data);
  // Initialize an array of conditions that we will use to filter through our optional content
  // Make sure keywords are in the order in which they'd appear in the table of contents
  const keyWords = ['installation', 'usage', 'license', 'contribution', 'tests'];
  // Filter through array and store items that are in keywords 
  const includedContent = optionalContent.filter(content => {
    return keyWords.includes(content); 
  })

  // Generate table of contents based on included content 
  const includedTags = includedContent.map(content => {
    return `<li><a href="#${content}">${capitalizeFirst(content)}</a></li>
    `
  }).join(""); 

  return `<h2>Table of Contents</h2>
 <ul>
  ${includedTags}
  <li><a href="#questions">Questions</a></li>
 </ul>`;
}

// Function to generate list of markdown content for the installation instructions and test instructions?
const generateInstallInstructions = instructions => {
  // Check to see if this object is actually included
  if (!instructions) {
    // Return nothing if there is nothing included
    return "";
  }
  const instructionSteps = instructions.map(({ instruction }) => {
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
  const instructionSteps = instructions.map(({ instruction }) => {
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
  if (!usage) {
    return "";
  }

  return `<h2 id="usage">Usage</h2>
  <p>${usage}</p>
  `;
}

const generateContributing = contribution => {
  if (!contribution) {
    return "";
  }

  return `<h2 id="contribution">Contribution</h2>
  <p>${contribution}</p>
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

  ${license} - Find out more about this license at: [https://choosealicense.com/licenses/](https://choosealicense.com/licenses/)`;
}

const generateContact = (github, email, contact) => {
  let contactInfo = `
  <p> 
  Made by: ${github}<br />
  Github Profile: https://github.com/${github}<br />
  </p>`;

  if (email) {
    contactInfo = contactInfo + `Email: ${email}<br />`;
  }

  contactInfo = contactInfo + `${contact}`;

  return contactInfo;
}

// TODO: Create a function to generate markdown for README
const generateMarkdown = data => {
  return `<h1>${data.title}</h1>
  ${renderLicenseBadge(data.license)}
  <h2>Description</h2>
  
  ${data.description}

  ${generateToc(data)}

  ${generateInstallInstructions(data.installation)}

  ${generateUsage(data.usage)}
 
  ${renderLicenseSection(data.license)}

  ${generateContributing(data.contribution)}
  
  ${generateTestInstructions(data.tests)}


  <h2 id="questions">Questions</h2>
  ${generateContact(data.github, data.email, data.contact)}
  `; 
}
// for why generateContact does generateContact({github, email}) not work?
module.exports = generateMarkdown;
