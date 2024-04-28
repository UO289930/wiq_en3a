const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/statistics.feature');
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
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    await registerUser('test4', 'test4@gmail.com', 'test4', page);
  });

  test('Entering the statistics page', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "test4"
      password = "test4"
      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toClick('button', { text: 'Log in' });
    });

    when('I click the link to the statistics page', async () => {
      await expect(page).toMatchElement("#normalGame", { text: "Normal Game" });
      await expect(page).toMatchElement("#triviaGame", { text: "Trivia Game" });
      await expect(page).toMatchElement("#stats", { text: "Statistics" });
      await expect(page).toClick('#stats');
    });

    then('The app shows the statistics page', async () => {
      await expect(page).toMatchElement(".h1-statistics", { text: "test4" });
      await expect(page).toMatchElement(".h2-statistics", { text: "test4@gmail.com" });
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