const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const { birdWatchObservationSchemaValidator, Observation } = require("../models/birdwatchobservation");
const FileUpload = require("../multerFileUpload");

router.get("/", async (req, res) => {
  const observations = await Observation.find(req.body.id);
  res.send(observations);
});

router.post('/', FileUpload.single('speciesImage'), (req, res, next) => {
  const { error } = birdWatchObservationSchemaValidator(req.body); /* Validating input body */
  if (error) return res.status(400).send(error.details[0].message);/* Validator error message if any error */
  const url = req.protocol + '://' + req.get('host')
  // req.body.speciesImage = req.file.filename;

  const observation = new Observation({
      speciesName: req.body.speciesName,
      rarity: req.body.rarity,
      notes: req.body.notes,
      speciesImage: url + '/uploads/' + req.file.filename,
      timestamp: 4545454545,
      geoLatitude: 145424542,
      geoLongitude: 2222222221
  });

  observation.save();
  res.status(201).send([observation, 'Successful']);
});

module.exports = router;
