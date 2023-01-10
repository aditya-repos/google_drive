/// <reference types="cypress" />

/**
 * This suite contains tests for file creation and 
 */
describe("Google Drive: File upload ", function () {
  
  let user;
  let folder_name = `sampleFolder_${getFormatedDateTime()}`;
  let file_name = getTestResouce();

  before(() => {
    cy.fixture("user").then((userData) => {
      user = userData;
    });
  });

  beforeEach(() => {
    //Open application
    cy.visit(Cypress.env("login_url"));
    cy.uncaughtExceptionHandler();
    
    //Login into website
    cy.loginIntoGoogleDrive(user.email, user.password);
  })

  it("Test1 -> Upload a file", () => {
    //Create a folder
    cy.craeteFolder(folder_name);
    //Search for the created folder
    cy.search(folder_name);
    //Create a file
    cy.creatFileIntoFolder(folder_name, file_name);
  });

  it("Test2 -> Search Upload a file", () => {
    cy.search(file_name);
    cy.creatFileIntoFolder(folder_name, file_name);
  });

  //Logout from the application
  afterEach(()=> {
    cy.logout()
  })
});

function getFormatedDateTime() {
  let date = new Date();
  return `${date.toLocaleDateString().replaceAll("/", "_")}_${date
    .toLocaleTimeString()
    .replaceAll(":", "_")}`;
}

function getTestResouce() {
  const path = require("path");
  let current_working_directory = path.dirname(__dirname);
  return `${current_working_directory}${path.sep}test_resource${path.sep}sample.txt`;
}
