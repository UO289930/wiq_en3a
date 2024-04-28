const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/trivia-game.feature');
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
      .goto("https://localhost", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    await registerUser('test7', 'test7@gmail.com', 'test7', page);
  });

  test('Playing a trivia game', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "test7"
      password = "test7"
      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toClick('button', { text: 'Log in' });
    });

    when('I click the link to the trivia game', async () => {
      await expect(page).toMatchElement("#normalGame", { text: "Normal Game" });
      await expect(page).toMatchElement("#triviaGame", { text: "Trivia Game" });
      await expect(page).toClick('#triviaGame');
    });

    then('The app enters a trivia game', async () => {
      await expect(page).toMatchElement("div", { id: "cajaQuesitos" });
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