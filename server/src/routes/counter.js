const express = require('express');

const router = express.Router();

let counter = 0;

router.get('/', async (req, res) => {
  res.status(200).send(`counter: ${counter}`);
});


router.post('/', async (req, res) => {
  counter += 1;
  res.status(200).send(`increased counter: ${counter}`);
});

module.exports = router;
