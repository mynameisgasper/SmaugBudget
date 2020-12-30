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
            await new Promise(r => setTimeout(r, 500));

            takeScreenshot(browser, 'test/porocilo/data.png');

            await new Promise(r => setTimeout(r, 1000));

            var url = await browser.getCurrentUrl();
            expect(url).to.include('dashboard');
        });
      });

      after(async () => {
        browser.quit();
      });
  
    } catch (error) {
      console.log("An error has occured during test!", error);
    }
  })();