const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');

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
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let username;
    let email;
    let password;

    given('An unregistered user', async () => {
      username = "test"
      email = "test@gmail.com"
      password = "test"
      await expect(page).toClick("button", { text: "Register" });
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="Email"]', email);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toFill('input[id="confirmPassword"]', password);
      await expect(page).toClick('button', { text: 'Create account' });
    });

    then('A confirmation message should be shown in the screen', async () => {
        await expect(page).toMatchElement('label', { text: "has been registered" });
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