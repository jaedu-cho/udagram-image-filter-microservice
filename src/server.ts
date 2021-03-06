import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8080;

  //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  app.get("/filteredimage", async ( req, res ) => {
    let { image_url } :{image_url:string}= req.query;
    // console.log(image_url)
    // 1. validate the image_url query
    if ( !image_url ) {
      return res.status(400).send('url is required.');
    }
    // 2. call filterImageFromURL(image_url) to filter the image
    filterImageFromURL(image_url).then((filteredpath) => {
      if(filteredpath === "error") {
        console.log("Can't read URL");
        return res.status(415).send("Can't read URL");
      } else {
        console.log('success');
        return res.status(200).sendFile(filteredpath, () => {deleteLocalFiles([filteredpath])});
      }})
    });
    


    // let filteredpath = await filterImageFromURL(image_url);
    // let local_image_list = [filteredpath];
    // 3. send the resulting file in the response and
    // 4. delete any filtes on the server on finish of the response
    // return res.status(200).sendFile(filteredpath, () => {deleteLocalFiles(local_image_list)});
  // });
  
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