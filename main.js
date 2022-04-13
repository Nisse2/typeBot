import puppeteer from 'puppeteer';

// import download from './scripts/downloader.js';
import cleanup from './scripts/cleanup.js';
import converter from './scripts/converter.js';
import imgToText from './scripts/imgToText.js';

// const { findDuplicates, removeDuplicates } = require('./imgDuplicateRemover/index.js');
function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
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

(async () => {

  // console.log(await cleanup('It sounded an excellent plan, no doub and very neatly and simply arranged the only difficulty was, that she ought to be going messages for a rabbit .'));

  const browser = await puppeteer.launch({
    fullscreen: true,
    headless: false,
    // 'args': ['--no-sandbox', '--disable-setuid-sandbox', '--start-fullscreen']
    'args': ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
  });


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
  await click(page, ".gwt-Anchor.prompt-button.bkgnd-blue"); // play solo 



  let textSelector = "#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div";
  await page.waitForSelector(textSelector);
  console.log("checking...");
  let elem = await page.$(textSelector);
  let text = await page.evaluate(el => el.textContent, elem);
  console.log(text);

  await delay(4500);

  console.log('typing...');
  await page.focus("#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input");
  // await delay(5000);
  // page.keyboard.type(text);
  for (let c of text) {
    await page.keyboard.type(c);
    await delay(80);
  }
  closePopup(page);
  await click(page, "body > div.DialogBox.trPopupDialog.challengePromptDialog > div > div > div.dialogContent > div > div > table > tbody > tr:nth-child(4) > td > button"); //train by myself
  // await delay(40);

  let cheatTextSelector = "body > div.DialogBox.trPopupDialog.typingChallengeDialog > div > div > div.dialogContent > div > div > table > tbody > tr:nth-child(4) > td > textarea";
  let imageSelector = ".challengeImg";
  let submitSelector = "body > div.DialogBox.trPopupDialog.typingChallengeDialog > div > div > div.dialogContent > div > div > table > tbody > tr:nth-child(5) > td > table > tbody > tr > td:nth-child(2) > button";

  // await page.waitForSelector(".challengeTextArea");
  // await delay(100);

  //Get captcha text
  //DO the request multiple times to get multiple lines and then take avarage.
  await page.waitForSelector(imageSelector);
  let imgUrl = 'https://play.typeracer.com/' + await page.$eval(imageSelector, img => img.getAttribute('src'));



  // let imgUrl = 'https://play.typeracer.com/challenge?id=1649848249035guest:56297712105194';

  let image = await converter(imgUrl);
  await image.writeAsync("./tmp/tmp.jpg");

  // text = await imgToText(image);


  const pageOcr = await browser.newPage();

  await pageOcr.setViewport({
    width: 1920,
    height: 1440,
    deviceScaleFactor: 1,
  });

  await pageOcr.bringToFront();
  await pageOcr.goto('https://www.prepostseo.com/image-to-text');

  await click(pageOcr, '#accept-choices'); //cookies

  console.log("uploading...");
  const elementHandle = await pageOcr.$("input[type=file]");
  await elementHandle.uploadFile('./tmp/tmp.jpg');

  // await delay(100000000);

  console.log("clicking submit...");

  await pageOcr.waitForSelector("#checkBtn");
  await delay(100);
  await pageOcr.click("#checkBtn");



  await pageOcr.waitForSelector('#ouput-content');
  console.log('extracting text (waiting for api)...');
  await pageOcr.waitForFunction(
    'document.querySelector("#ouput-content").innerText != " Extracting Text"'
  );

  elem = await pageOcr.$('#ouput-content');
  text = await pageOcr.evaluate(el => el.textContent, elem);
  text = await cleanup(text);


  await page.bringToFront();


  await delay(100);
  console.log("[2] typing: ", text);
  await page.focus(".challengeTextArea");
  // await page.keyboard.type(text);
  for (let c of text) {
    await page.keyboard.type(c);
    await delay(10);
  }

  await delay(4000);
  await click(page, submitSelector);

  // await browser.close();
})();


