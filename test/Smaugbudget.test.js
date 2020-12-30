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

(async function SmaugBudget() {
    // Knjižnice
    fs = require('fs');
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
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
  
      context("Login", function() {
        this.timeout(30 * 1000);
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
<<<<<<< HEAD
            await new Promise(r => setTimeout(r, 10000));
=======
            await new Promise(r => setTimeout(r, 500));

            takeScreenshot(browser, 'test/porocilo/data.png');

            await new Promise(r => setTimeout(r, 1000));
>>>>>>> 56f8434bcb7b9e0a44025dc6cd38a3af761bc80d

            var url = await browser.getCurrentUrl();
            expect(url).to.include('dashboard');
        });
      });
      
      describe("Register", function() {
        this.timeout(30 * 1000);
        before(() => { browser.get(applicationUrl); });

        it("Open modal", async () => {
            await waitPageLoaded(browser, 10, "//h4");
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

        it("Confimr page", async () => {
          let registerButton = await browser.findElements(By.xpath("//input[contains(@id, 'buttonid')]"));
          expect(registerButton).to.not.be.empty;
          await registerButton[0].click();
        
          await new Promise(r => setTimeout(r, 1000));

          takeScreenshot(browser, 'test/data4.png')

          await new Promise(r => setTimeout(r, 3000));

          var url = await browser.getCurrentUrl();
          console.log(url)
          expect(url).to.include('confirm');
      });
      
      });

      after(async () => {
        browser.quit();
      });
  
    } catch (error) {
      console.log("An error has occured during test!", error);
    }
  })();