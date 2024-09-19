var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

/* GET home page. */
router.get('/menu', function(req, res, next) {
  res.json({ plat: 'mais', boisson: ['eau', "café", "thé"], prix: '20' });
});

/* GET home page. */
router.get('/information', function(req, res, next) {
  res.json({ title: 'Information' });
});

module.exports = router;
