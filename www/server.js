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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Init the Express application
    const app = (0, express_1.default)();
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    app.get("/filteredimage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const imageUrl = req.query.image_url;
        // 1. Validate the image_url query
        if (!imageUrl) {
            return res.status(400).send({ message: "image_url is required." });
        }
        try {
            // 2. Call filterImageFromURL(image_url) to filter the image
            const filteredPath = yield (0, util_1.filterImageFromURL)(imageUrl.toString());
            // 3. Send the resulting file in the response
            res.sendFile(filteredPath, (err) => {
                // 4. Delete any files on the server on finish of the response
                if (err) {
                    console.error("Error sending file:", err);
                }
                (0, util_1.deleteLocalFiles)([filteredPath]);
            });
        }
        catch (error) {
            console.error("Error filtering image:", error);
            res.status(500).send({ message: "Failed to process the image. Try again later." });
        }
    }));
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map