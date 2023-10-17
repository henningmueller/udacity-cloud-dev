import fs from "fs";
import Jimp = require("jimp");
import path from "path";

import axios from 'axios'; // You can install it via npm if you haven't: `npm install axios`

export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch the image data
      const response = await axios.get(inputURL, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, "binary");

      if (!buffer || buffer.length === 0) {
        reject("Downloaded image buffer is empty");
        return;
      }

      console.log(`Downloaded image size: ${buffer.length} bytes`);

      const photo = await Jimp.read(buffer); // Use buffer here instead of URL
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo.write(__dirname + outpath, (img) => {
        resolve(__dirname + outpath);
      });
    } catch (error) {
      reject(error);
    }
  });
}


export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        try {
            fs.unlinkSync(file);
        } catch (error) {
            console.error("Error deleting file", file, error);
        }
    }
}
