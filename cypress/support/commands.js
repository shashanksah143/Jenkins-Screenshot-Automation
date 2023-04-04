
Cypress.Commands.add('login', () => {
    cy.fixture('global_data.json').then(global_data => {
       let absolute_url=global_data.home_page_url + global_data.user_data.login_relative_path;
       let username=global_data.user_data.username;
       let username_input=global_data.element_selectors.login_input_selector;
       let password=global_data.user_data.password;
       let password_input=global_data.element_selectors.login_password_selector;
       let submit_button=global_data.element_selectors.submit_button_selector;
       let page_load_validator=global_data.element_selectors.login_validation_selector;
       
       cy.visit(absolute_url)// opening loggin url
       cy.get(username_input).type(username)//entering username
       cy.get(password_input).type(password) //entering password
       cy.get(submit_button).click()//clicking login button
       cy.wait(1000)
       cy.get(page_load_validator) //validate login
    });
})


Cypress.Commands.add("getCoordinates",(screenshot_method)=>{    
    if(screenshot_method.type==="full_screen")
        return null;
    if(screenshot_method.type==="single_element"){
        cy.get(screenshot_method.element_selector).then($el => {
            let x = $el[0].getBoundingClientRect().x;
            let y=$el[0].getBoundingClientRect().y;
            let width=$el[0].getBoundingClientRect().width;
            let height=$el[0].getBoundingClientRect().height
            return { x: x, y:y, width: width, height: height }
        })
    }
    if(screenshot_method.type==="multi_elements"){
        let x1=0,y1=0,x2=0,y2=0;
        cy.get(screenshot_method.top_left_element_selector).then($el => {
            x1 = $el[0].getBoundingClientRect().x;
            y1=$el[0].getBoundingClientRect().y; 
        }).then(_=>{
            cy.get(screenshot_method.bottom_right_element_selector).then($el => {
                x2= $el[0].getBoundingClientRect().x+$el[0].getBoundingClientRect().width;
                y2=$el[0].getBoundingClientRect().y+ $el[0].getBoundingClientRect().height
            })
        }).then(_=>{
            return { x: x1, y:y1, width: x2-x1, height: y2-y1}
        })
    }
})


Cypress.Commands.add('getPath', (file_name, new_path) => {
    const path = require('path')  
    let old_path = './cypress/screenshots/' + file_name + ".png";
    let updated_path ='./screenshots' + new_path  + file_name + ".png";
    let dir = path.dirname(updated_path);

    return {currentPath:old_path,newPath:updated_path,dir:dir}
})
