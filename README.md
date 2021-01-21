# Image Processing API
**Note**: This repo is the code for a Udacity mentor certification with their `Image Processing API` project.

## Getting Started
After cloning the repo, make sure to install necessary packages:<br/>
`npm install`<br/>
Optionally, you can initialize an `.env` file with:<br/>
`npm run initenv`<br/>
(**Note**: Remember to configure your new `.env` file, otherwise you may run into errors).<br/>
Start the development server with:<br/>
`npm start`<br/>

## Using the API
This server exposes a dynamic endpoint that allows you to make modifications to the images in the library. You can add more images to the library by dropping them in the `images/base` folder.<br/>
**Caution**: This API only handles `.jpg` files.

## Endpoints
_All endpoints must be prefixed by the the server's base address (eg: localhost:3001)_

### /v1/images/:image
**Parameters**:<br/>
`image`: This is the image to be retrieved and modified. You can reference available images in the image library in "images/base".<br/>

**Query Parameters**:<br/>
_There are several optional query parameters to dictate how the image should be modified._<br/>
`width`: The width of the rendered image. (Must be between 1 and 9999)<br/>
`height`: The height of the rendered image. (Must be between 1 and 9999)<br/>
`quality`: The quality of the rendered image. (Must be between 1 and 100)<br/>

**Example Usage**:<br/>
`localhost:3001/v1/images/icelandwaterfall.jpg`<br/>
`localhost:3001/v1/images/fjord.jpg?width=512&quality=75`<br/>

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

---
### Backend Error Statuses:
`INVALID_PROPERTIES`: The properties provided to the endpoint are invalid.<br/>
`VALUE_IS_NOT_A_STRING`: The value provided must be a string, but it is not.<br/>
`STRING_DOES_NOT_MATCH`: The provided string does not match one of the available options.<br/>
`UNPERMITTED_VALUE`: An invalid property was found in the payload.<br/>
`MISSING_REQUIRED_PROPERTY`: The payload is missing a required property.<br/>
`REQUIRES_ONE_OPTIONAL_PROPERTY`: The payload requires at least one optional property to be declared.<br/>
`UNKNOWN_ERROR`: An unknown error has occurred.<br/>
`IMAGE_DOES_NOT_EXIST`: The requested file does not exist.<br/>
