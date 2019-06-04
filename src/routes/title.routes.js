const express = require('express');
const router = express.Router();
const titleData = require('../models/title')

router.get('/', async (req, res) => {
  res.json(titleData)
});

// ADD Title
router.post('/', async (req, res) => {
  titleData['info'].push(req.body);

  res.json({status: 'Title Saved'});
});


module.exports = router;

