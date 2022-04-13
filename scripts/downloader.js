import puppeteer from 'puppeteer';

import stream from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import got from 'got';

const pipeline = promisify(stream.pipeline);

async function downloadImage (url, filepath) {
  await pipeline(
    got.stream(url),
    fs.createWriteStream(filepath)
  );
}

const click = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.click(selector);
};

const closePopup = async (page) => {
  try {
    await page.waitForSelector('.xButton', { timeout: 8000 });
  } catch (e) {
    // if (!(e instanceof TimeoutError)) {
    //   console.log("closing popup");
    //   await page.click('.xButton');
    // }
    //if error (timeout) return, else click
    return;
  }
  console.log("closing popup");
  await page.click('.xButton');
};

export default async () => {
  const browser = await puppeteer.launch({
    fullscreen: true,
    headless: false,
    // 'args': ['--no-sandbox', '--disable-setuid-sandbox', '--start-fullscreen']
    'args': ['--no-sandbox', '--disable-setuid-sandbox']
  });
  // const browser = await puppeteer.launch()
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  // setting headers to make it look like user
  await page.setRequestInterception(true);
  page.on('request', request => {
    // Do nothing in case of non-navigation requests.
    if (!request.isNavigationRequest()) {
      request.continue();
      return;
    }
    // Add a new header for navigation request.
    const headers = request.headers();
    headers['user-agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36";
    request.continue({ headers });
  });


  await page.goto('https://play.typeracer.com/');

  await click(page, ".css-47sehv");
  await click(page, ".gwt-Anchor.prompt-button.bkgnd-blue"); //train by myself
  // await page.click(".css-47sehv", { delay: 2000 });
  // await page.click(".gwt-Anchor.prompt-button.bkgnd-blue", { delay: 1000 });

  // await delay(3000);



  let textSelector = "#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div";
  await page.waitForSelector(textSelector);
  console.log("checking...");
  let elem = await page.$(textSelector);
  let text = await page.evaluate(el => el.textContent, elem);
  console.log(text);



  await delay(4500);
  console.log('typing...');
  await page.focus("#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input");
  for (let c of text) {
    await page.keyboard.type(c);
    await delay(40);
  }
  closePopup(page);
  await click(page, "body > div.DialogBox.trPopupDialog.challengePromptDialog > div > div > div.dialogContent > div > div > table > tbody > tr:nth-child(4) > td > button"); //train by myself

  let cheatTextSelector = "body > div.DialogBox.trPopupDialog.typingChallengeDialog > div > div > div.dialogContent > div > div > table > tbody > tr:nth-child(4) > td > textarea";
  let imageSelector = ".challengeImg";
  let submitSelector = "body > div.DialogBox.trPopupDialog.typingChallengeDialog > div > div > div.dialogContent > div > div > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td:nth-child(2) > button";
  let reSubmitSelector = "body > div.DialogBox.trPopupDialog.typingChallengeResultDialog > div > div > div.dialogContent > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > button";


  console.log("downloading...");
  await delay(500);
  for (let i = 0; i < 5; i++) {
    await page.waitForSelector(imageSelector);
    let imgUrl = 'https://play.typeracer.com/' + await page.$eval(imageSelector, img => img.getAttribute('src'));
    let time = new Date();
    await downloadImage(imgUrl, `./images/${time.getTime()}.jpg`);
    await click(page, submitSelector);
    await click(page, reSubmitSelector);
    await delay(500);
  }
  await page.waitForSelector(imageSelector);
  let imgUrl = 'https://play.typeracer.com/' + await page.$eval(imageSelector, img => img.getAttribute('src'));
  // console.log(imgUrl);
  let time = new Date();
  await downloadImage(imgUrl, `./images/${time.getTime()}.jpg`);
  console.log("done!");


  // downloadImage(imgUrl, 'C:/dev/typeracer/images/img.jpg');


  // await page.waitForSelector(imageSelector);
  // imgUrl = 'https://play.typeracer.com/' + await page.$eval(imageSelector, img => img.getAttribute('src'));
  // console.log(imgUrl);



  // await delay(1000);
  // await page.screenshot({ path: 'cheat.png' });


  // await delay(1000000);


  await browser.close();
};

// DELAY FUNCTION
function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}