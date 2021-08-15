const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            // If there is an error, reject the Promise and send the error to the Promise's catch method
            if (err) {
                reject(err);
                // Return out of the function
                return;
            }

            // If everything goes fine, resolve the Promise and send succeful data to then method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

module.exports = writeFile; 