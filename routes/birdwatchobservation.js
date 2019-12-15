const experss = require("express");
const router = experss.Router();
const {
  birdWatchObservationSchemaValidator,
  Observation,
} = require("../models/birdwatchobservation");
const FileUpload = require("../aws-multer");
var ExifImage = require("exif").ExifImage;

//fetching data
router.get("/", async (req, res) => {
  const observations = await Observation.find(req.body.id);
  const a = observations.map(observation => {
    new ExifImage({ image: observation.speciesImage }, function(
      error,
      exifData
    ) {
      if (error) console.log("Error: " + error.message);
      

        res.json({
          observation: observations,
          exif: exifData,
          image: observation.speciesImage,
        });
        console.log(req.get('host'))
      
    });
  });
});

router.post("/", FileUpload, (req, res) => {
  const { error } = birdWatchObservationSchemaValidator(req.body); // Validating input body
  if (error) return res.status(400).send(error.details[0].message); // Validator error message if any error

  const imageName = req.file.key;
  const imageLocation = req.file.location;

  const observation = new Observation({
    speciesName: req.body.speciesName,
    rarity: req.body.rarity,
    notes: req.body.notes,
    speciesImage: imageLocation,
    timestamp: 4545454545,
    geoLatitude: 145424542,
    geoLongitude: 2222222221,
  });
  // Save the file name into database
  observation.save();
  // Sends the response of 201 with json objects.
  res.status(201).json({
    observation: observation,
    imageName: imageName,
    file: req.file,
    msg: "Observation Data Added Successfully.",
  });
});

module.exports = router;
