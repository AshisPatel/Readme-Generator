// Function to generate list of markdown content for the installation instructions and test instructions?
const generateInstructions = instructions => {
  // Check to see if this object is actually included
  if (!instructions) {
    // Return nothing if there is nothing included
    return "";
  }
  return instructions.map(({ instruction }) => {
    return `<li>${instruction}</li> 
    `;
  }).join('');
};

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
  ##License

  ${license} - Find out more about this license at: [https://choosealicense.com/licenses/${license}/](https://choosealicense.com/licenses/${license}/)`;
}

const generateContact = (github, email) => {
  let contactInfo = `
  Made by: ${github}<br />
  Github Profile: https://github.com/${github}<br />`;

  if (email) {
    contactInfo = contactInfo + `Email: ${email}`;
  }

  return contactInfo;
}

// TODO: Create a function to generate markdown for README
const generateMarkdown = data => {
  console.log(data);
  return `# ${data.title}
  ${renderLicenseBadge(data.license)}
  ## Description
  
  ${data.description}

  ## Table of Contents

  ## Installation
  <ol>
    ${generateInstructions(data.install)}
  </ol>

  ## Usage
  ${data.usage}
  ${renderLicenseSection(data.license)}
  ## Contributing
  ${data.contributions}
  ## Tests
  <ol>
    ${generateInstructions(data.test)}
  </ol>

  ## Questions 
  ${generateContact(data.github, data.email)}
  
`;
}
// for why generateContact does generateContact({github, email}) not work?
module.exports = generateMarkdown;
