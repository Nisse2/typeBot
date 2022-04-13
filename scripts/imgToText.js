import axios from 'axios';
import FormData from 'form-data';
import Jimp from 'jimp';
import fs from 'fs';
import stringSimilarity from 'string-similarity';

let data = new FormData();

let apiKey = 'eb_vnS22vmlgyKWD_zuTn78UvdGoAyJr';

export default async (image) => {
  // export default async (filePaths) => {
  data.apend('urls', 'FILE_URL');
  for (filePath of filePaths) {
    data.append('file', fs.createReadStream(filePath));
  }

  // data.append('file', fs.createReadStream('./readmeImages/example2.jpg'));
  // await image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
  //   console.log(buffer);
  //   data.append('file', buffer);
  // });
  // console.log(res);

  let config = {
    method: 'post',
    url: 'https://app.nanonets.com/api/v2/OCR/FullText',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(apiKey + ":").toString('base64'),
      ...data.getHeaders()
    },
    data: data
  };

  let response = await axios(config)
    .catch(function (error) {
      console.log(error);
      console.log('ERROR (check above)');
    });
  // return response.data.results

  //{name: 'text', name: 'text', ...}

  return response;
  // obj = {};
  // for (img of response.data.results) {
  //   obj[img.filename] = img.page_data[0].raw_text;
  // }
  // return obj;
  // return response.data.results[0].page_data[0].words.map(words => words.text);
};