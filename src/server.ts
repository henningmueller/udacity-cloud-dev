import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req: Request, res: Response) => {
    const imageUrl = req.query.image_url;

    // 1. Validate the image_url query
    if (!imageUrl) {
        return res.status(400).send({ message: "image_url is required." });
    }

    try {
        // 2. Call filterImageFromURL(image_url) to filter the image
        const filteredPath = await filterImageFromURL(imageUrl);

        // 3. Send the resulting file in the response
        res.sendFile(filteredPath, (err) => {
            // 4. Delete any files on the server on finish of the response
            if (err) {
                console.error("Error sending file:", err);
            }
            deleteLocalFiles([filteredPath]);
        });
    } catch (error) {
        console.error("Error filtering image:", error);
        res.status(500).send({ message: "Failed to process the image. Try again later." });
    }
  });
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();