const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const user = {
  name: "Alex",
  password: "password",
  role: "admin"
};

const user2 = {
  name: "John",
  password: "password2",
  role: "client"
}

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

  if ((user.name !== userName) && (user2.name !== userName)) {
    return res.status(401).json({ message: "Utilisateur inconnu" });
  }

  if ((user.password !== userPassword) && (user2.password !== userPassword)) {
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  let role;

  if (userName === "Alex") {
    role = user.role;
  } if (userName === "John") {
    role = user2.role;
  }

  const token = jwt.sign({ name: userName, role: role }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });


});

module.exports = router;
