//goal, make black stripe white so it isn't taken as text

// const { mask } = require('jimp');
// const jimp = require('jimp');
import jimp from 'jimp';
// var hex = require("hex");


export default async (url) => {
  // const image = await jimp.read('./readmeImages/example.jpg');
  // const image = await jimp.read('./readmeImages/1649227770760.jpg');
  const image = await jimp.read(url);

  image.normalize();
  image.dither565();

  image.color([{ apply: 'greyscale', params: [] },]);
  // image.contrast(0.1);


  let threshold = 180;  // Replace colors under this threshold. The smaller the number, the more specific it is.
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const thisColor = [image.bitmap.data[idx + 0], , image.bitmap.data[idx + 1], , image.bitmap.data[idx + 2],];
    // console.log(thisColor);
    // if (colorDistance(targetColor, thisColor) <= threshold) {
    // console.log(thisColor[0]);

    if (thisColor[0] > threshold && thisColor[0] > threshold && thisColor[0] > threshold) {
      // console.log("replacing");
      image.bitmap.data[idx + 0] = 255;
      image.bitmap.data[idx + 1] = 255;
      image.bitmap.data[idx + 2] = 255;
    }
  });


  // you could even check if neighbours are above threshold


  threshold = 60;  // Replace colors under this threshold. The smaller the number, the more specific it is.
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const thisColor = [image.bitmap.data[idx + 0], , image.bitmap.data[idx + 1], , image.bitmap.data[idx + 2],];
    // console.log(thisColor);
    // if (colorDistance(targetColor, thisColor) <= threshold) {
    // console.log(thisColor[0]);

    // image.bitmap.data[idx + 0] = y;
    // image.bitmap.data[idx + 1] = y;
    // image.bitmap.data[idx + 2] = y;
    // c++;
    if (thisColor[0] < threshold && thisColor[0] < threshold && thisColor[0] < threshold) {
      // console.log("replacing");
      image.bitmap.data[idx + 0] = 255;
      image.bitmap.data[idx + 1] = 255;
      image.bitmap.data[idx + 2] = 255;
    }
  });


  threshold = 255;  // Replace colors under this threshold. The smaller the number, the more specific it is.
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const thisColor = [image.bitmap.data[idx + 0], , image.bitmap.data[idx + 1], , image.bitmap.data[idx + 2],];
    // console.log(thisColor);
    // if (colorDistance(targetColor, thisColor) <= threshold) {
    // console.log(thisColor[0]);

    // image.bitmap.data[idx + 0] = y;
    // image.bitmap.data[idx + 1] = y;
    // image.bitmap.data[idx + 2] = y;
    // c++;
    if (thisColor[0] < threshold && thisColor[0] < threshold && thisColor[0] < threshold) {
      // console.log("replacing");
      image.bitmap.data[idx + 0] = 0;
      image.bitmap.data[idx + 1] = 0;
      image.bitmap.data[idx + 2] = 0;
    }
  });

  // image.normalize();
  // image.dither565();


  // image.contrast(0.5);
  // image.contrast(0.5);
  // image.posterize(1);

  // let mask = image.clone();
  // image.invert();

  //get stripes
  // await mask.threshold({
  //   max: 60,
  //   replace: 255
  // });
  // mask.invert();
  // mask.contrast(0.9);

  // mask.color([{ apply: 'red', params: [100] }]);
  // mask.contrast(1);

  // image.mask(mask, 0, 0);
  // image.blit(mask, 10, 10);


  // image.invert();

  // hex(mask.bitmap.data);
  // await mask.writeAsync("./readmeImages/mask.jpg");

  // await image.writeAsync("./readmeImages/example2.jpg");
  console.log("done");
  return image;

};
