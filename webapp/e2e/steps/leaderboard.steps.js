const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/leaderboard.feature');
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

    await registerUser('test5', 'test5@gmail.com', 'test5', page);
  });

  test('Entering the leaderboard page', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "test5"
      password = "test5"
      await expect(page).toFill('input[id="Username"]', username);
      await expect(page).toFill('input[id="password"]', password);
      await expect(page).toClick('button', { text: 'Log in' });
    });

    when('I click the link to the leaderboard page', async () => {
      await expect(page).toMatchElement("#normalGame", { text: "Normal Game" });
      await expect(page).toMatchElement("#triviaGame", { text: "Trivia Game" });
      await expect(page).toMatchElement("#leaderboard", { text: "Leaderboard" });
      await expect(page).toClick('#leaderboard');
    });

    then('The app shows the leaderboard page', async () => {
      await expect(page).toMatchElement("#leaderboardHeader", { text: "LEADERBOARD" });
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