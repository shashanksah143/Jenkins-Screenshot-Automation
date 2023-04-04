describe("Login",()=>{

    it('Capturing dashboard screenshot', () => {
        let globalData
        cy.fixture('global_data.json').then(global_data => {
            globalData=global_data
        })
        cy.fixture('screenshot_page_config/using_jenkins/search_box').then(testdata => {
            testdata.ss_config.forEach(data => {
                cy.login();
                cy.viewport(data.view_port.width, data.view_port.height)
                cy.visit(globalData.home_page_url + data.relative_url)
                cy.wait(1000)
                cy.getCoordinates(data.screenshot_method).then(cord=>{
                   if(cord!=null){
                    cy.screenshot(data.save_name,{capture: 'viewport', clip: { x: cord.x, y: cord.y, width: cord.width, height: cord.height } }).then(_=>{
                        cy.getPath(data.save_name,data.save_path).then(data=>{
                            cy.task("log","shashank sah")
                            cy.task('moveScreenshot', { currentPath:data.currentPath,newPath:data.newPath,dir:data.dir })
                        })
                    })
                   }
                   else{
                    cy.screenshot(data.save_name).then(_=>{
                        cy.moveScreenshot(data.save_name,data.save_path);
                    })
                   }
                })
            });
        });
    })
})
