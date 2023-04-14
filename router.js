const router = require("express").Router();

// import controllers
const register = require("./controllers/register");
const login = require("./controllers/login");
const validate = require("./controllers/validate");

// root directory
router.get("/", (req, res) => {
  res.send("Server is up and running");
});

// register
router.post("/register", register);

// login
router.post("/login", login);

// validate
router.post("/validate", validate);

module.exports = router;
