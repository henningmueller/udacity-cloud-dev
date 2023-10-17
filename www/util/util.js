"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalFiles = exports.filterImageFromURL = void 0;
const fs_1 = __importDefault(require("fs"));
const Jimp = require("jimp");
const axios_1 = __importDefault(require("axios"));
function filterImageFromURL(inputURL) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch the image data
                const response = yield axios_1.default.get(inputURL, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, "binary");
                if (!buffer || buffer.length === 0) {
                    reject("Downloaded image buffer is empty");
                    return;
                }
                console.log(`Downloaded image size: ${buffer.length} bytes`);
                const photo = yield Jimp.read(buffer); // Use buffer here instead of URL
                const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
                yield photo.write(__dirname + outpath, (img) => {
                    resolve(__dirname + outpath);
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.filterImageFromURL = filterImageFromURL;
function deleteLocalFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let file of files) {
            try {
                fs_1.default.unlinkSync(file);
            }
            catch (error) {
                console.error("Error deleting file", file, error);
            }
        }
    });
}
exports.deleteLocalFiles = deleteLocalFiles;
//# sourceMappingURL=util.js.map