const express = require("express");
const app = express();
const middleware = require("./middleware");
const birdwatchobservation = require("./routes/birdwatchobservation");
const DATABASECONNECT = require("./config/database");

const PORT = process.env.PORT || 5000; /* PORT declaration, 5000 as a local port */

middleware(express, app); /* middleware for cors controls */

DATABASECONNECT();

app.get("/", (req, res) => {
  res.send("This is testing page.");
});

app.use('/uploads', express.static('uploads'));



app.use("/api/birdwatchobservation", birdwatchobservation); /* Creating api for birdwatchobservation route */

app.listen(PORT, () => {
  console.log(`App is served on port ${PORT}`);
});