const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const {
  birdWatchObservationSchemaValidator,
  Observation,
} = require("../models/birdwatchobservation");
const FileUpload = require("../aws-multer");

//fetching data
router.get("/", async (req, res) => {
  const observations = await Observation.find(req.body.id);
  res.send(observations);
});

router.post("/", FileUpload, (req, res) => {
  FileUpload(req, res, err => {
    if (err) {
      res.send(err);
    } else {
     

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
        msg: "Added Successfully.",
      });
    }
  });
});

module.exports = router;
