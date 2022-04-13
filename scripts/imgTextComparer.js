const imgToText = require('./imgToText.js');
const stringSimilarity = require("string-similarity");
const fs = require('fs');

module.exports = async (filePaths) => {
  console.log('converting imgs to text...');

  names = fs.readdirSync('./images/');
  // names = fs.readdirSync('./imagesTest/');
  names.pop();
  names = names.map(name => "./images/" + name);

  // let data = await imgToText(['./images/1649227510949.jpg', './images/1649227511762.jpg', './images/1649227512538.jpg']);
  let data = await imgToText(names);
  // console.log(data);
  names = Object.keys(data);
  console.log('all names', names);

  //compare
  console.log('comparing texts...');

  let similarities = {};

  for (i = 0; i < names.length; i++) {
    // names[i] = outer name
    console.log((i / (names.length - 1) * 100).toFixed(2) + "%");
    for (o = i + 1; o < names.length; o++) {
      // names[o] = inner name
      // console.log([names[i], names[o]]);

      similarity = stringSimilarity.compareTwoStrings(data[names[i]], data[names[o]]);
      similarities[similarity] = `for ${names[i]} and ${names[o]}`;

      // console.log(`${similarity} for ${names[i]} and ${names[o]}`);
    }
  }
  for (similarity of Object.keys(similarities).sort()) {
    console.log(parseFloat(similarity).toFixed(2), similarities[similarity]);
  }

  // similarities = Object.keys(similarities).sort().reduce(
  //   (obj, key) => {
  //     obj[key] = similarities[key];
  //     return obj;
  //   },
  //   {}
  // );
  // console.log(similarities);



};



// console.log(JSON.stringify(data));