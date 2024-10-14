const express = require('express');
const router = express.Router();

/* POST home page. */
router.post('/getMenu', (req, res) => {
  res.json({ plat: 'mais', boisson: ['eau', "café", "thé"], prix: '20' });
});

module.exports = router;
