const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/logout.feature');

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
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Logging out of the app', ({given,when,then}) => {
    
    let username;
    let password;

    given('An just logged in user', async () => {
      username = "trogui"
      password = "0000"

      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toClick('button', { text: 'Log in' })
    });

    when('I click the logout button', async () => {
      await expect(page).toMatchElement("button", { id: "Logout" });
      await expect(page).toClick('button', { text: 'Logout' })
    });

    then('The login page appears on screen', async () => {
        await expect(page).toMatchElement("button", { text: "Log in" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});