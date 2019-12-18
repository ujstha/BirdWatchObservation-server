# BirdWatchObservation-server
This project is a server-side for a mobile app #BirdWatchObservation.
This project was created using NodeJS, ExpressJS and MongoDB(mLab).
This project also uses Cloudinary for Image Uploading System and Extraction of Exif Data from images.
This app is a progressive web app which means it can be opened without internet connection. This app has also been deployed as a web app.
Open [https://birdwatchobservation.netlify.com/].

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs the packages and dependecies

### `npm start`

Runs the app in the development mode using NODE.<br />
All your API can be fetched or posted to, through <br />
## BASEURL 
[http://localhost:5000/api/]

### `npm run dev`
It runs the server in development mode using NODEMON.


## NOTE : 
For this to run locally you need to 

## Create .env file On project Directory and 
put following credentials  <br />
MONGODB_URI=yourMlabDbUri  <br />
CLOUDINARY_CLOUD_NAME=yourCloudinaryCloudName  <br />
CLOUDINARY_API_KEY=yourCloudinaryApiKey  <br />
CLOUDINARY_API_SECRET=yourCloudinaryApiSecret
