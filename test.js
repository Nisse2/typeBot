import fetch from 'node-fetch';
import converter from './scripts/converter.js';
import imgToText from './scripts/imgToText.js';
import jimp from 'jimp';
import fs from 'fs';
import cleanup from './scripts/cleanup.js';

(async () => {
  cleanup(`
  Alice laud hed so much at this, that she had brought herself down to look down and saying to herself This is Bill, she gave one sharp kick, and waited to
====
=
=
=
=
  `
  );
  // let imgUrl = 'https://play.typeracer.com/challenge?id=1649848249035guest:56297712105194';
  // let image = await converter(imgUrl);

  // await image.writeAsync("./tmp/tmp.jpg");


  // let buffer = "";
  // image.getBuffer(jimp.MIME_JPEG, (err, Buffer) => { buffer = Buffer; });

  // console.log(buffer);
  // fs.writeFile('./1.jpg', buffer, () => { });

  // let res = await fetch("https://www.prepostseo.com/frontend/uploadImageToTextFiles", {
  //   "headers": {
  //     "accept": "application/json, text/javascript, */*; q=0.01",
  //     "accept-language": "en-US,en;q=0.9",
  //     "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryAFbxZa4EdcLzAeta",
  //     "newrelic": "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjIxMTU1NjAiLCJhcCI6IjEwNTUzODY3NzIiLCJpZCI6IjQ3MjYzZTZlN2MyYWE4ZjMiLCJ0ciI6IjVhYjQ2ZGQ0ZmM4MjAzNjAyMDhjY2M3ZWY0MWFiNmEwIiwidGkiOjE2NDk4NDc2NTIyNTd9fQ==",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-origin",
  //     "sec-gpc": "1",
  //     "traceparent": "00-5ab46dd4fc820360208ccc7ef41ab6a0-47263e6e7c2aa8f3-01",
  //     "tracestate": "2115560@nr=0-1-2115560-1055386772-47263e6e7c2aa8f3----1649847652257",
  //     "x-newrelic-id": "VgcGVFNVCBABVFRXBAkBUF0B",
  //     "x-requested-with": "XMLHttpRequest",
  //     "cookie": "__cf_bm=diXfrJ2I2MlweWFgkxLU030LrBfZC2YyxHL0KWkSKX8-1649847606-0-AYRGdsXIDSNzHz3BuMAcAjeOn+addSzp5+LIQu9YQ9nn/vuOFtA9gmuegim2Q1jDI8OutUY9qKgqSmLpYVgDdyOWurKO8pwc7X8UswwV40pPeX7+yjjVPfKCNDLD6dsvLA==; ci_session=a%3A6%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%2222e05863b435be84b33ddc0a7585ec2c%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A14%3A%2281.229.145.235%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A115%3A%22Mozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F100.0.4896.79%20Safari%2F537.36%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1649847606%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3Bs%3A9%3A%22sys-hCode%22%3Bs%3A4%3A%224F52%22%3B%7De275784dd769683354eaaa0230245a64",
  //     "Referer": "https://www.prepostseo.com/image-to-text",
  //     "Referrer-Policy": "strict-origin-when-cross-origin"
  //   },
  //   "body": buffer,
  //   "method": "POST"
  // });
  // console.log(res);





  // let text = await imgToText(image);

  //LOL, if you remove identification headers, it'll give msg: '404 UnAuthorize' but it'll still include the response text
  // let res = await fetch("https://www.prepostseo.com/frontend/extractImgText", {
  //   "headers": {
  //     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  //     "cookie": "ci_session=a%3A7%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%22a106f7085624e58b331880cfbfda69d7%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A14%3A%2281.229.145.235%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A115%3A%22Mozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F100.0.4896.79%20Safari%2F537.36%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1649779966%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3Bs%3A9%3A%22sys-hCode%22%3Bs%3A4%3A%22E9E3%22%3Bs%3A9%3A%22itxt-hash%22%3Bs%3A5%3A%22E876E%22%3B%7De2a143ff27962693b3a1648ec3b0e894",
  //     // "cookie": "ci_session=a%3A7%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%22a106f7085624e58b331880cfbfda69d7%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A14%3A%2281.229.145.235%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A115%3A%22Mozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F100.0.4896.79%20Safari%2F537.36%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1649779966%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3Bs%3A9%3A%22sys-hCode%22%3Bs%3A4%3A%22E9E3%22%3Bs%3A9%3A%22itxt-hash%22%3Bs%3A5%3A%22E876E%22%3B%7De2a143ff27962693b3a1648ec3b0e894",
  //   },
  //   "body": "code=E876E&imgUrl=https%3A%2F%2Fwww.prepostseo.com%2Ftmp_imgs%2F5656644541649780042.jpg",
  //   "method": "POST"
  // });
  // console.log(await res.json());
})();