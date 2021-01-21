# Image Processing API
**Note**: This repo is the code for a Udacity mentor certification with their `Image Processing API` project.

## Getting Started
After cloning the repo, make sure to install necessary packages:<br/>
`npm install`<br/>
Optionally, you can initialize an `.env` file with:<br/>
`npm run initenv`<br/>
(**Note**: Remember to configure your new `.env` file, otherwise you may run into errors).<br/>
Then to start the development server run:<br/>
`npm start`<br/>

## Using the API
This server exposes a dynamic endpoint that allows you to make modifications to the images in the library. You can add more images to the library by dropping them in the `images/base` folder.<br/>
**Caution**: This API only handles `.jpg` files.

## Endpoints
_All endpoints must be prefixed by the the server's base address (eg: localhost:3001)_

### /v1/images/<image>
**Parameters**:
`image` - This is the image to be retrieved and modified. You can reference available images in the image library in `images/base`.<br/>

**Query Parameters**:
_There are several optional query parameters to dictate how the image should be modified._
`width` - The width of the rendered image. (Must be between 1 and 9999)
`height` - The height of the rendered image. (Must be between 1 and 9999)
`quality` - The quality of the rendered image. (Must be between 1 and 100)

**Example Usage**:
`localhost:3001/v1/images/icelandwaterfall.jpg`
`localhost:3001/v1/images/fjord.jpg?width=512&quality=75`

---

## Running Tests & Linting
To run tests provided by Jest, simply run:<br/>
`npm run test`<br/>
To detect any linting errors in the code with ESlint and Prettier use:<br/>
`npm run lint`<br/>
If you'd like to automatically fix some errors use:<br/>
`npm run lint:fix`<br/>

## Running Production Server
To run the server in production, you must first run the build script with:<br/>
`npm run build`<br/>
Then launch the production server with:<br/>
`npm run start:prod`<br/>
