const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/logout.feature');
const { registerUser } = require('../utils.js');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 40 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

      await registerUser('test3', 'test3@gmail.com', 'test3', page);
  });

  test('Logging out of the app', ({given,when,then}) => {
    
    let username;
    let password;

    given('An just logged in user', async () => {
      username = "test3";
      password = "test3";

      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toClick('button', { text: 'Log in' })
    });

    when('I click the logout button', async () => {
      await expect(page).toMatchElement("#normalGame", { text: "Normal Game" });
      await expect(page).toMatchElement("#triviaGame", { text: "Trivia Game" });
      await expect(page).toMatchElement("#logout", { text: "Logout" });
      await expect(page).toClick('#logout');
    });

    then('The login page appears on screen', async () => {
        await expect(page).toMatchElement("button", { text: "Log in" });
    });
  })

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  afterAll(async ()=>{
    browser.close()
  })

});