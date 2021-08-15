const fs = require("fs");
const { getVideoDurationInSeconds } = require("get-video-duration");
const { exit } = require("process");

// const pathName = "C:/Users/Vendetta/Desktop/renameFolder/";
const pathName = "renameFolder/";

const readDirPromise = new Promise((resolve, reject) => {
  // console.time('start');
  let durSum = 0;
  fs.readdir(pathName, async (err, files) => {
    if (!err) {
      for (const file of files) {
        const fullPath = pathName + file;
        await getVideoDurationInSeconds(fullPath).then((duration) => {
          durSum += duration;
          // console.log("durSum inside the methode: " + durSum);
        });
      }
      resolve(durSum);
      // console.timeEnd('start');
    } else {
      console.error("Could not do it", err);
      reject(err);
    }
  });
});

readDirPromise.then(durSum => {
  const time = {
    Seconds: getMinutes(durSum).sec + 's',
    minutes: getMinutes(durSum).min + 'm',
    hours: getMinutes(durSum).hour + 'h',
  }
  console.table(time);
}).catch(err => {
  console.log('something went wrong ', err);
  exit(1);
});

function getMinutes(num) {
  return {
    sec: Math.round(num),
    min: Math.round((num / 60) * 100) / 100,
    hour: Math.round((num / (60 * 60)) * 100) / 100,
  };
}