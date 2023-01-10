//Type on a given target element
Cypress.Commands.add("loginIntoGoogleDrive", (userName, password) => {
  //Add user input validation
  cy.get(`[type="email"]`).type(`{backspace}${userName}`).type("{enter}");
  cy.screenshot("username_page");
  cy.get(`[type="password"]`).type(`${password}`).type("{enter}");
  cy.screenshot("user_password");
});

//
Cypress.Commands.add("craeteFolder", (folder_name) => {
  if (null == folder_name) {
    throw new Error("Folder name should not be null");
  }
  cy.get(
    'button[type="button"][role="button"][guidedhelpid="new_menu_button"]'
  ).click();
  cy.get('[aria-label="New folder"]').click();
  //Name your folder
  cy.wait(3000)
    .get(`[value="Untitled folder"]`)
    .clear({ force: true })
    .wait(3000)
    .type(`${folder_name}`)
    .type("{enter}", { force: true });
});

Cypress.Commands.add("creatFileIntoFolder", (folder_name, file_name) => {
  if (null == folder_name || null == file_name) {
    throw new Error("Folder/File name should not be null");
  }
  //Create a new file
  //Select a folder
  cy.wait(5000).get(`[aria-label^="${folder_name}"]`).eq(0).type("{enter}");

  //Create a file
  cy.wait(5000)
    .get('[aria-label^="No files in this folder."]')
    .eq(0)
    .selectFile(file_name, { action: "drag-drop" })
    .wait(2000);
});

Cypress.Commands.add("search", (folder_name) => {
  if (null == folder_name) {
    throw new Error("Folder name should not be null");
  }
  //Search folder
  cy.wait(500)
    .get(`[aria-label="Search in Drive"]`)
    .clear()
    .wait(1000)
    .type(`${folder_name}`)
    .type("{enter}")
    .wait(5000);
});

Cypress.Commands.add("logout", () => {
  //Logout from Google Drive
  cy.wait(3000).get('[aria-label^="Google Account:"]').click();
  cy.wait(3000)
    .get(`iframe[name="account"]`)
    .its("0.contentDocument")
    .its("body")
    .find(`div`)
    .should("have.text", "Sign out")
    .click();
});
