// Function to generate list of markdown content for the installation instructions and test instructions?
const generateInstructions = instructions => {
  instructions.map(({ instruction }) => {
    return `* ${instruction}`;
  }).join(''); 
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
const generateMarkdown = data => {
  return `# ${data.title}

  ## Description
  
  ${data.description}

  ## Table of Contents

  ## Installation
  ${generateInstructions(data.install)}
  ## Usage
  ${data.usage}
  ## License

  ## Contributing
  ${data.contributions}
  ## Tests
  ${generateInstructions(data.test)}
  ## Questions 
`;
}

module.exports = generateMarkdown;
