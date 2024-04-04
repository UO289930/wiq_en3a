const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/login-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Logging in a new user', ({given,when,then}) => {
    
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "trogui"
      password = "0000"
      //await expect(page).toClick("button", { text: "Login" });
    });

    when('I fill the data in the form and press login', async () => {
      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toClick('button', { text: 'Log in' });
    });

    then('The app loads and the start game appers', async () => {
        await expect(page).toMatchElement("button", { text: "Start Game!" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});