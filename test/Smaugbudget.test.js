/**
 * Funkcionalni testi
 */

function takeScreenshot(browser, filename) {
  browser.takeScreenshot().then(result => fs.writeFile(filename, result.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
    if (err) {
      console.log("Error saving screenshot");
    }
    else {
      console.log("Screenshot saved!");
    }
  }));
}

function savePageSource(browser, filename) {
  browser.getPageSource().then(result => fs.writeFile(filename, result, function(err) {
    if (err) {
      console.log("Error saving page source");
    }
    else {
      console.log("Page source saved!");
    }
  }));
}

(async function SmaugBudget() {
    // Knjižnice
    fs = require('fs');
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until, Key } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;
    
    // Parametri
    let applicationUrl = "http://smaugbudget.herokuapp.com/";
    let seleniumServerUrl = "http://localhost:4445/wd/hub";
    let browser, jwtToken;
  
    const axios = require('axios').create({
      baseURL: applicationUrl + "api/",
      timeout: 5000
    });
    
    // Obvladovanje napak
    process.on("unhandledRejection", (error) => {
      console.log(error);
    });
  
    // Počakaj določeno število sekund na zahtevani element na strani
    let waitPageLoaded = async (browser, timeVS, xpath) => {
      await browser.wait(() => {
        return browser.findElements(By.xpath(xpath)).then(elementi => {
          return elementi[0];
        });
      }, timeVS * 1000, `Page did not load in ${timeVS} s.`);
    };
  
    try {
  
      before(() => {
        browser = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options()
          .addArguments("start-maximized")
          .addArguments("disable-infobars")
          .addArguments("allow-insecure-localhost")
          .addArguments("allow-running-insecure-content")
        )
        .usingServer(seleniumServerUrl)
        .build();
      });

      //Finished
      /*describe("Register", function() {
        this.timeout(30 * 1000);
        before(() => { browser.get(applicationUrl); });

        context("Register new user", function() {
          it("Open modal", async () => {
            await waitPageLoaded(browser, 10, "//h4");
            await new Promise(r => setTimeout(r, 2000));
            let registerButton = await browser.findElements(By.xpath("//a[contains(@href, '#registration')]"));
            expect(registerButton).to.not.be.empty;
            await registerButton[1].click();
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
            await new Promise(r => setTimeout(r, 1000));
          });
        
          it("Enter data", async () => {
            let nameField = await browser.findElements(By.xpath("//input[contains(@id, 'nameup')]"));
            expect(nameField).to.not.be.empty;
            nameField[0].sendKeys("Bodza");
            console.log(await browser.findElements(By.xpath("//input[contains(@id, 'nameup')]")));

            let surnameField = await browser.findElements(By.xpath("//input[contains(@id, 'surnameup')]"));
            expect(surnameField).to.not.be.empty;
            surnameField[0].sendKeys("Reciever");

            let email1Field = await browser.findElements(By.xpath("//input[contains(@id, 'email1up')]"));
            expect(email1Field).to.not.be.empty;
            email1Field[0].sendKeys("BodzaGolman@gmail.com");

            let email2Field = await browser.findElements(By.xpath("//input[contains(@id, 'email2up')]"));
            expect(email2Field).to.not.be.empty;
            email2Field[0].sendKeys("BodzaGolman@gmail.com");

            let password1Field = await browser.findElements(By.xpath("//input[contains(@id, 'password1up')]"));
            expect(password1Field).to.not.be.empty;
            password1Field[0].sendKeys("VelikaZoga1!");

            let password2Field = await browser.findElements(By.xpath("//input[contains(@id, 'password2up')]"));
            expect(password2Field).to.not.be.empty;
            password2Field[0].sendKeys("VelikaZoga1!");

            await new Promise(r => setTimeout(r, 1000));
          });

          it("Register", async () => {
            let registerButton = await browser.findElements(By.xpath("//input[contains(@id, 'buttonid')]"));
            expect(registerButton).to.not.be.empty;
            await registerButton[0].click();
          
            await new Promise(r => setTimeout(r, 1000));
  
            takeScreenshot(browser, 'test/porocilo/data3.png')
  
            await new Promise(r => setTimeout(r, 3000));
  
            var url = await browser.getCurrentUrl();
            console.log(url)
            expect(url).to.include('confirm');
          });
        });
      });*/
  
      
      //Finished
      
      describe("Login", function() {
        context("Fail login", function() {
          this.timeout(60 * 1000);
          before(() => { browser.get(applicationUrl); });
  
          it("Open modal", async () => {
            await waitPageLoaded(browser, 10, "//h4");
            let loginButton = await browser.findElements(By.xpath("//a[contains(text(), 'SIGN IN')]"));
            expect(loginButton).to.not.be.empty;
            await loginButton[0].click();
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;

            await new Promise(r => setTimeout(r, 1000));
          });

          it("Enter data", async () => {
            let emailField = await browser.findElements(By.xpath("//input[contains(@id, 'emailin')]"));
            expect(emailField).to.not.be.empty;
            emailField[0].sendKeys("nonexisting@smaug.com");

            let passwordField = await browser.findElements(By.xpath("//input[contains(@id, 'passwordin')]"));
            expect(passwordField).to.not.be.empty;
            passwordField[0].sendKeys("Somethingrandom");
            
            await new Promise(r => setTimeout(r, 1000));
          });

          it("Login", async () => {
            let loginButton = await browser.findElements(By.xpath("//input[contains(@value, 'Login')]"));
            expect(loginButton).to.not.be.empty;
            loginButton[0].click();
            await new Promise(r => setTimeout(r, 1000));

            var url = await browser.getCurrentUrl();
            expect(url).to.not.include('dashboard');
          });

          it("Close modal", async() => {
            let closeButton = await browser.findElements(By.xpath("//button[contains(@class, 'close')]"));
            expect(closeButton).to.not.be.empty;
            closeButton[0].click();

            await new Promise(r => setTimeout(r, 1000));
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.be.empty;
          });
        });

        context("Successfully login Gold User", function() {
          this.timeout(30 * 1000);
          before(() => { browser.get(applicationUrl); });
  
          it("Open modal", async () => {
            await waitPageLoaded(browser, 10, "//h4");
            let loginButton = await browser.findElements(By.xpath("//a[contains(text(), 'SIGN IN')]"));
            expect(loginButton).to.not.be.empty;
            await loginButton[0].click();
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;

            await new Promise(r => setTimeout(r, 5000));
          });

          it("Enter data", async () => {
            let emailField = await browser.findElements(By.xpath("//input[contains(@id, 'emailin')]"));
            expect(emailField).to.not.be.empty;
            emailField[0].sendKeys("gold@smaug.com");

            let passwordField = await browser.findElements(By.xpath("//input[contains(@id, 'passwordin')]"));
            expect(passwordField).to.not.be.empty;
            passwordField[0].sendKeys("Goldpass1");
            
            await new Promise(r => setTimeout(r, 1000));
          });

          it("Login", async () => {
            let loginButton = await browser.findElements(By.xpath("//input[contains(@value, 'Login')]"));
            expect(loginButton).to.not.be.empty;
            loginButton[0].click();
            await new Promise(r => setTimeout(r, 20000));


            var url = await browser.getCurrentUrl();
            expect(url).to.include('dashboard');
            await new Promise(r => setTimeout(r, 2000));
          });
        });
      });
      /*
      describe("Envelope", function() {
        this.timeout(30 * 1000);

        context("Fail saving existing envelope", async () => {
          this.timeout(30 * 1000);
  
          it("Open envelopes tab", async () => {
            let envelopesButton = await browser.findElements(By.xpath("//a[contains(@routerlink, '../envelopes')]"));
            expect(envelopesButton).to.not.be.empty;
            envelopesButton[0].click();
            await new Promise(r => setTimeout(r, 5000));
  
            var url = await browser.getCurrentUrl();
            expect(url).to.include('envelopes');
          });

          it("Open modal", async () => {
            let addEnvelopesButton = await browser.findElements(By.xpath("//button[contains(@href, '#addEnvelopeForm')]"));
            expect(addEnvelopesButton).to.not.be.empty;
            addEnvelopesButton[0].click();
            await new Promise(r => setTimeout(r, 1000));
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
          });

          it("Enter data", async () => {
            let categoryField = await browser.findElements(By.xpath("//select[contains(@name, 'chooseCategoryEnvelope')]"));
            expect(categoryField).to.not.be.empty;
            categoryField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            let categoryOptionField = await browser.findElements(By.xpath("//option[contains(@value, 'Car')]"));
            expect(categoryOptionField).to.not.be.empty;
            categoryOptionField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            let ammountField = await browser.findElements(By.xpath("//input[contains(@name, 'inputAmount')]"));
            expect(ammountField).to.not.be.empty;
            ammountField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            ammountField[0].sendKeys("250");
            await new Promise(r => setTimeout(r, 1000));
          });

          it("Save envelope", async () => {
            let addEnvelopesButton = await browser.findElements(By.xpath("//button[contains(@id, 'buttonAddEnvelopes')]"));
            expect(addEnvelopesButton).to.not.be.empty;
            addEnvelopesButton[0].click();
            await new Promise(r => setTimeout(r, 1000));
            await new Promise(r => setTimeout(r, 1000));

            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
            await new Promise(r => setTimeout(r, 1000));
          });
        });

        context("Delete envelope", async () => {
          this.timeout(30 * 1000);
          before(() => { browser.get(applicationUrl); });  

          it("Open envelopes tab", async () => {
            let envelopesButton = await browser.findElements(By.xpath("//a[contains(@routerlink, '../envelopes')]"));
            expect(envelopesButton).to.not.be.empty;
            envelopesButton[0].click();
            await new Promise(r => setTimeout(r, 1000));
            envelopesButton[0].click();
            await new Promise(r => setTimeout(r, 5000));

            var url = await browser.getCurrentUrl();
            expect(url).to.include('envelopes');
            await new Promise(r => setTimeout(r, 2000));
          });

          it("Delete envelope", async () => {
            let deleteButton = await browser.findElements(By.xpath("//button[contains(@class, 'btn edit-btn')]"));
            expect(deleteButton).to.not.be.empty;
            deleteButton[0].click();
            await new Promise(r => setTimeout(r, 2000));
            await browser.switchTo().alert().accept();
            await new Promise(r => setTimeout(r, 2000));
          });
        });

        context("Save new envelope", async () => {
          this.timeout(30 * 1000);
          /*before(() => { browser.get(applicationUrl); });
  
          it("Open envelopes tab", async () => {
            let envelopesButton = await browser.findElements(By.xpath("//a[contains(@routerlink, '../envelopes')]"));
            expect(envelopesButton).to.not.be.empty;
            envelopesButton[0].click();
            await new Promise(r => setTimeout(r, 2000));
  
            var url = await browser.getCurrentUrl();
            expect(url).to.include('envelopes');
          });

          it("Open modal", async () => {
            let addEnvelopesButton = await browser.findElements(By.xpath("//button[contains(@href, '#addEnvelopeForm')]"));
            expect(addEnvelopesButton).to.not.be.empty;
            addEnvelopesButton[0].click();
            await new Promise(r => setTimeout(r, 1000));
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
          });

          it("Enter data", async () => {
            let categoryField = await browser.findElements(By.xpath("//select[contains(@name, 'chooseCategoryEnvelope')]"));
            expect(categoryField).to.not.be.empty;
            categoryField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            let categoryOptionField = await browser.findElements(By.xpath("//option[contains(@value, 'Car')]"));
            expect(categoryOptionField).to.not.be.empty;
            categoryOptionField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            let ammountField = await browser.findElements(By.xpath("//input[contains(@name, 'inputAmount')]"));
            expect(ammountField).to.not.be.empty;
            ammountField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            ammountField[0].sendKeys("100");
            await new Promise(r => setTimeout(r, 1000));
          });

          it("Save envelope", async () => {
            let addEnvelopesButton = await browser.findElements(By.xpath("//button[contains(@id, 'buttonAddEnvelopes')]"));
            expect(addEnvelopesButton).to.not.be.empty;
            addEnvelopesButton[0].click();
            await new Promise(r => setTimeout(r, 2000));
            addEnvelopesButton[0].click();

            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
            await new Promise(r => setTimeout(r, 5000));
          });
        });
      });
      */
      describe("Add new goal", function() {
        context("Failed to create new goal", function() {
          this.timeout(60 * 1000);

          it("Redirect to goal tab", async () => {
            let goalLink = await browser.findElements(By.xpath("//a[contains(@routerlink, '../goals')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(goalLink).to.not.be.empty;
            goalLink[0].click();
            
            await new Promise(r => setTimeout(r, 11000));
            var url = await browser.getCurrentUrl();
            expect(url).to.include('goals');

          });
          
          it("Open modal", async () => {
            let addGoalButton = await browser.findElements(By.xpath("//button[contains(@href, '#addGoalForm')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(addGoalButton).to.not.be.empty;
            addGoalButton[0].click();

            await new Promise(r => setTimeout(r, 1000));
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
          });
          
          it("Enter data", async () => {
            let goalName = await browser.findElements(By.xpath("//input[contains(@id, 'Goal')]"));
            expect(goalName).to.not.be.empty;
            goalName[0].sendKeys("House");
            await new Promise(r => setTimeout(r, 5000));
            
            let categoryField = await browser.findElements(By.xpath("//select[contains(@name, 'inputCategory')]"));
            expect(categoryField).to.not.be.empty;
            categoryField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            let categoryOptionField = await browser.findElements(By.xpath("//option[contains(text(), 'Home')]"));
            expect(categoryOptionField).to.not.be.empty;
            categoryOptionField[0].click();
            await new Promise(r => setTimeout(r, 1000));
            
            let amount = await browser.findElements(By.xpath("//input[contains(@id, 'Amount')]"));
            expect(amount).to.not.be.empty;
            amount[0].sendKeys("30000");
            await new Promise(r => setTimeout(r, 1000));
            
            let buttonAdd = await browser.findElements(By.xpath("//button[contains(@id, 'buttonAddGoal')]"));
            expect(buttonAdd).to.not.be.empty;
            buttonAdd[0].click();
            await new Promise(r => setTimeout(r, 2000));
          });
        });

        context("Successful new goal", function() {
          this.timeout(30 * 1000);
          before(() => { browser.get(applicationUrl); });

          it("Redirect to goal tab", async () => {
            await new Promise(r => setTimeout(r, 1000));
            let goalLink = await browser.findElements(By.xpath("//a[contains(@routerlink, '../goals')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(goalLink).to.not.be.empty;
            goalLink[0].click();
            
            await new Promise(r => setTimeout(r, 5000));
            var url = await browser.getCurrentUrl();
            expect(url).to.include('goals');

          });
          
          it("Open add modal", async () => {
            let addGoalButton = await browser.findElements(By.xpath("//button[contains(@href, '#addGoalForm')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(addGoalButton).to.not.be.empty;
            addGoalButton[0].click();

            await new Promise(r => setTimeout(r, 1000));
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
          });
          
          it("Enter data", async () => {
            let goalName = await browser.findElements(By.xpath("//input[contains(@id, 'Goal')]"));
            expect(goalName).to.not.be.empty;
            goalName[0].sendKeys("House");
            await new Promise(r => setTimeout(r, 1000));
            
            let categoryField = await browser.findElements(By.xpath("//select[contains(@name, 'inputCategory')]"));
            expect(categoryField).to.not.be.empty;
            categoryField[0].click();
            await new Promise(r => setTimeout(r, 1000));

            let categoryOptionField = await browser.findElements(By.xpath("//option[contains(text(), 'Home')]"));
            expect(categoryOptionField).to.not.be.empty;
            categoryOptionField[0].click();
            await new Promise(r => setTimeout(r, 1000));
            
            let amount = await browser.findElements(By.xpath("//input[contains(@id, 'Amount')]"));
            expect(amount).to.not.be.empty;
            amount[0].sendKeys("30000");
            await new Promise(r => setTimeout(r, 1000));
            
            let date = await browser.findElements(By.xpath("//input[contains(@id, 'inputDateAddGoal')]"));
            expect(date).to.not.be.empty;
            date[0].sendKeys("01/01/2026");
            await new Promise(r => setTimeout(r, 1000));

            let buttonAdd = await browser.findElements(By.xpath("//button[contains(@id, 'buttonAddGoal')]"));
            expect(buttonAdd).to.not.be.empty;
            buttonAdd[0].click();
            await new Promise(r => setTimeout(r, 5000));
          });
        });

        context("Edit goal", function() {
          this.timeout(30 * 1000);
          //before(() => { browser.get(applicationUrl); });

          it("Open edit modal", async () => {
            let editGoalButton = await browser.findElements(By.xpath("//button[contains(@class, 'edit-btn')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(editGoalButton).to.not.be.empty;
            editGoalButton[5].click();

            await new Promise(r => setTimeout(r, 1000));
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;
          });

          it("Enter data", async () => {
            let categoryField = await browser.findElements(By.xpath("//select[contains(@name, 'inputCategory')]"));
            expect(categoryField).to.not.be.empty;
            categoryField[3].click();
            await new Promise(r => setTimeout(r, 1000));

            let categoryOptionField = await browser.findElements(By.xpath("//option[contains(text(), 'Gifts')]"));
            expect(categoryOptionField).to.not.be.empty;
            categoryOptionField[3].click();
            await new Promise(r => setTimeout(r, 1000));

            let buttonAdd = await browser.findElements(By.xpath("//button[contains(@class, 'btn-primary')]"));
            expect(buttonAdd).to.not.be.empty;
            buttonAdd[5].click();
            await new Promise(r => setTimeout(r, 5000));
          });
        });

        context("Delete goal", function() {
          this.timeout(30 * 1000);
          //before(() => { browser.get(applicationUrl); });

          it("Click delete button", async () => {
            let deleteGoalButton = await browser.findElements(By.xpath("//button[contains(@class, 'edit-btn')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(deleteGoalButton).to.not.be.empty;
            deleteGoalButton[4].click();
            await new Promise(r => setTimeout(r, 2000));
            await browser.switchTo().alert().accept();
            await new Promise(r => setTimeout(r, 2000));
          });
        });
      });

      describe("History filter", function() {
        context("Find expense", function() {
          this.timeout(30 * 1000);
          it("Redirect to history tab", async () => {
            let historyLink = await browser.findElements(By.xpath("//a[contains(@routerlink, 'history')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(historyLink).to.not.be.empty;
            historyLink[0].click();
            
            await new Promise(r => setTimeout(r, 11000));
            var url = await browser.getCurrentUrl();
            expect(url).to.include('history');
            await new Promise(r => setTimeout(r, 1000));
          });

          it("Input search", async () => {
            let input = await browser.findElements(By.xpath("//input[contains(@id, 'filter')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(input).to.not.be.empty;
            input[0].sendKeys('Lidl', Key.ENTER);
            await new Promise(r => setTimeout(r, 2000));
            let tr = await browser.findElements(By.xpath("//td"));
            await new Promise(r => setTimeout(r, 1000));
            expect(tr).to.not.be.empty;
            await new Promise(r => setTimeout(r, 1000));
            let outputVal = await tr[2].getAttribute("innerText");
            await new Promise(r => setTimeout(r, 1000));
            expect(outputVal).to.include('Lidl');
            await new Promise(r => setTimeout(r, 1000));
          });
        });
      });
      
      describe("Money converter", function() {
        context("Successful converting", function() {
          this.timeout(30 * 1000);
  
          it("Redirect to goal tab", async () => {
            let utilitiesLink = await browser.findElements(By.xpath("//a[contains(@routerlink, 'utilities')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(utilitiesLink).to.not.be.empty;
            utilitiesLink[0].click();
            
            await new Promise(r => setTimeout(r, 11000));
            var url = await browser.getCurrentUrl();
            expect(url).to.include('utilities');
          });

          it("Check if field is empty", async () => {
            let output = await browser.findElements(By.xpath("//output[contains(@id, 'Amount2')]"));
            expect(output).to.not.be.empty;
            await new Promise(r => setTimeout(r, 1000));
            let outputVal = await output[0].getAttribute("value");
            expect(outputVal).to.be.empty;
            await new Promise(r => setTimeout(r, 1000));
          });

          it("Insert data and call", async () => {
            let amount = await browser.findElements(By.xpath("//input[contains(@id, 'Amount')]"));
            expect(amount).to.not.be.empty;
            amount[0].sendKeys("100");
            await new Promise(r => setTimeout(r, 1000));

            let convertButton = await browser.findElements(By.xpath("//button[contains(text(), 'Convert')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(convertButton).to.not.be.empty;
            convertButton[0].click();
            await new Promise(r => setTimeout(r, 2000));
            convertButton[0].click();
            await new Promise(r => setTimeout(r, 5000));

          });

          it("Check if field has value", async () => {
            let output = await browser.findElements(By.xpath("//output[contains(@id, 'Amount2')]"));
            expect(output).to.not.be.empty;
            await new Promise(r => setTimeout(r, 1000));
            let outputVal = await output[0].getAttribute("value");
            expect(outputVal).to.not.be.empty;
            await new Promise(r => setTimeout(r, 1000));
          });
        });
      });
      
      describe("Logout", function() {
        context("Successful logout", function() {
          before(() => { browser.get(applicationUrl); });
          this.timeout(30 * 1000);
  
          it("Open dropdown", async () => {
            await new Promise(r => setTimeout(r, 5000));
            await waitPageLoaded(browser, 10, "//h4");
            let dropdown = await browser.findElements(By.xpath("//div[contains(@id, 'navbarDropdownMenuLink-4')]"));
            expect(dropdown).to.not.be.empty;
            await dropdown[0].click();
            await new Promise(r => setTimeout(r, 1000));
            let openedDropdown = await browser.findElements(By.xpath("//div[contains(@aria-expanded, 'true')]"));
            expect(openedDropdown).to.not.be.empty;
          });

          it("Logout", async () => {
            await waitPageLoaded(browser, 10, "//h4");
            let logoutButton = await browser.findElements(By.xpath("//a[contains(text(), ' Logout')]"));
            await new Promise(r => setTimeout(r, 1000));
            expect(logoutButton).to.not.be.empty;
            await logoutButton[0].click();
            await new Promise(r => setTimeout(r, 1000));
            var url = await browser.getCurrentUrl();
            expect(url).to.equals('https://smaugbudget.herokuapp.com/');
          });
        });
      });
      
      describe("Reset database with admin account", function() {
        context("Successfully login Admin User", function() {
          this.timeout(30 * 1000);
          before(() => { browser.get(applicationUrl); });
  
          it("Open modal", async () => {
            await waitPageLoaded(browser, 10, "//h4");
            let loginButton = await browser.findElements(By.xpath("//a[contains(text(), 'SIGN IN')]"));
            expect(loginButton).to.not.be.empty;
            await loginButton[0].click();
            let opened = await browser.findElements(By.xpath("//div[contains(@class, 'modal-backdrop fade show')]"));
            expect(opened).to.not.be.empty;

            await new Promise(r => setTimeout(r, 5000));
          });

          it("Enter data", async () => {
            let emailField = await browser.findElements(By.xpath("//input[contains(@id, 'emailin')]"));
            expect(emailField).to.not.be.empty;
            emailField[0].sendKeys("admin@smaug.com");

            let passwordField = await browser.findElements(By.xpath("//input[contains(@id, 'passwordin')]"));
            expect(passwordField).to.not.be.empty;
            passwordField[0].sendKeys("Adminpass1");
            
            await new Promise(r => setTimeout(r, 1000));
          });

          it("Login", async () => {
            let loginButton = await browser.findElements(By.xpath("//input[contains(@value, 'Login')]"));
            expect(loginButton).to.not.be.empty;
            loginButton[0].click();
            await new Promise(r => setTimeout(r, 20000));

            
            var url = await browser.getCurrentUrl();
            expect(url).to.include('dashboard');
            await new Promise(r => setTimeout(r, 2000));
          });

          context("Navigate to administration panel", function() {
            it("Open dropdown", async () => {
              await waitPageLoaded(browser, 10, "//h4");
              let dropdown = await browser.findElements(By.xpath("//div[contains(@id, 'navbarDropdownMenuLink-4')]"));
              expect(dropdown).to.not.be.empty;
              await dropdown[0].click();
              await new Promise(r => setTimeout(r, 1000));
              let openedDropdown = await browser.findElements(By.xpath("//div[contains(@aria-expanded, 'true')]"));
              expect(openedDropdown).to.not.be.empty;
            });

            it("Click on administartion panel", async () => {
              await waitPageLoaded(browser, 10, "//h4");
              let adminButton = await browser.findElements(By.xpath("//a[contains(text(), ' Administration panel')]"));
              await new Promise(r => setTimeout(r, 1000));
              expect(adminButton).to.not.be.empty;
              await adminButton[0].click();
              await new Promise(r => setTimeout(r, 1000));
              
              var url = await browser.getCurrentUrl();
              expect(url).to.equals('https://smaugbudget.herokuapp.com/db');
            });
          });

          context("Reset database", function() {
            it("Click on delete all data", async () => {
              let deleteDataButton = await browser.findElements(By.xpath("//button[contains(@class, 'btn btn-danger')]"));
              await new Promise(r => setTimeout(r, 1000));
              expect(deleteDataButton).to.not.be.empty;
              deleteDataButton[0].click();

              await new Promise(r => setTimeout(r, 1000));
              await browser.switchTo().alert().accept();
            });

            it("Click on add test data", async () => {
              let addDataButton = await browser.findElements(By.xpath("//button[contains(@class, 'btn btn-success')]"));
              await new Promise(r => setTimeout(r, 1000));
              expect(addDataButton).to.not.be.empty;
              addDataButton[0].click();

              await new Promise(r => setTimeout(r, 1000));
              await browser.switchTo().alert().accept();
            });
          });
        });
      });

      after(async () => {
        browser.quit();
      });
  
    } catch (error) {
      console.log("An error has occured during test!", error);
    }
  })();