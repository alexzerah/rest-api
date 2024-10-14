const express = require('express');
const   router = express.Router();  

router.post("/createMenu", function(req, res) {
  res.json({ message: "Menu créé" });
});

module.exports = router;
