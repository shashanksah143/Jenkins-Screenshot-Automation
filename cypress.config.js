const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        createDir({filePath}){
          const fs = require('fs-extra');
          const path = require('path')
          let dir = path.dirname(filePath);
          fs.ensureDir(dir)
          return null
        },
        moveScreenshot({currentPath,newPath,dir}) {
          const fs = require('fs-extra');
          fs.ensureDir(dir)
          .then(() => {
            fs.rename(currentPath, newPath, (err) => {
              if (err) {
              console.log('Error moving screenshot: ', err);
              } else {
              console.log('Screenshot moved successfully.');
              }
          });
          })
          .catch((err) => {
            console.error(err);
          });
          return null
        },
        compressScreenshot({quality,currentPath,savedPath}) {
          const sharp = require('sharp');
          const fs = require('fs-extra');

          fs.readFile(currentPath)
          .then(data => {
            // Compress image
            sharp(data)
              .png({ quality: quality })
              .toFile(savedPath)
              .then(() => {
                console.log('Image compressed and saved successfully.');
              })
              .catch(error => {
                console.error('Error compressing image:', error);
              });
          })
          .catch(error => {
            console.error('Error reading input file:', error);
          });
          return null
        },
        readDirectoryRecursive(directoryPath) {
          const filePaths = [];
          const fse = require('fs-extra');
          function readDirectory(dirPath) {
            const files = fse.readdirSync(dirPath);
            files.forEach(file => {
              const filePath = `${dirPath}/${file}`;
              const stats = fse.statSync(filePath);
              if (stats.isDirectory()) {
                readDirectory(filePath);
              } else if (!file.startsWith('.')) { // check if file is not hidden
                filePaths.push(filePath);
              }
            });
          }
    
          readDirectory(directoryPath);
          return filePaths;
        }
      })
    },
  },
});


