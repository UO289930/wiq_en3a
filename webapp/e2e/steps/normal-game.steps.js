const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/normal-game.feature');
const { registerUser } = require('../utils.js');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch({slowMo: 50})
      : await puppeteer.launch({ headless: false, slowMo: 40 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("https://localhost", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    await registerUser('test6', 'test6@gmail.com', 'test6', page);
  });

  test('Playing a normal game', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "test6"
      password = "test6"
      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toClick('button', { text: 'Log in' });
    });

    when('I click the link to the normal game', async () => {
      await expect(page).toMatchElement("#normalGame", { text: "Normal Game" });
      await expect(page).toMatchElement("#triviaGame", { text: "Trivia Game" });
      await expect(page).toClick('#normalGame');
    });

    then('The app enters a normal game', async () => {
      await expect(page).toMatchElement("text", { text: "1/10" });
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