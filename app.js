const fs = require("fs");
const {getVideoDurationInSeconds} = require("get-video-duration");

// const pathName = "C:/Users/Vendetta/Desktop/renameFolder/";
const pathName = "renameFolder/";

let durSum = 0;

fs.readdir(pathName, (err, files) => {
  if (!err) {
    files.forEach(async (file) => {
      const fullPath = pathName + file;
      getVideoDurationInSeconds(fullPath).then((duration) => {
        durSum += duration;
        console.log("durSum inside the methode: " + durSum);
      });
    });
  } else {
    console.error("Could not do it", err);
    process.exit(1);
  }
});


console.log("duration Sum is: " + durSum);