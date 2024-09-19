const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const user = {};

router.post("/signup", function(req, res) {
  user.name = req.body.name;
  user.password = req.body.password;

  res.json({ message: "vous etes bien inscrit", user });
});

const SECRET_KEY = 'secretKey'; // A remplacer par une clé secrète

router.post("/login", function(req, res) {
  userName = req.body.name;
  // Dans la vraie vie, on compaererait le mot de passe chiffré de la BDD
  userPassword = req.body.password;

  if (user.name !== userName) {
    return res.status(401).json({ message: "Utilisateur inconnu" });
  }

  if (user.password !== userPassword) {
    res.status(401).json({ message: "Mot de passe incorrect" });
  }

  const token = jwt.sign({ name: userName }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ message: "Vous êtes connecté", token });


});

module.exports = router;
