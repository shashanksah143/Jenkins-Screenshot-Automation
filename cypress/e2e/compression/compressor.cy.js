describe("Compressing Screenshot taken",()=>{
    it('Iterate all screenshots',()=>{
        const directoryPath = './screenshots';
        cy.task('readDirectoryRecursive', directoryPath).then(filePaths => {
            filePaths.forEach((element) => {
                let compressed_image_path =element.replace("./screenshots","./compressed-screenshot")
                cy.task("createDir",{filePath:compressed_image_path}).then(_=>{
                    cy.task('compressScreenshot', {quality:60,currentPath:element ,savedPath:compressed_image_path})
                })
              });
        });
    })
})