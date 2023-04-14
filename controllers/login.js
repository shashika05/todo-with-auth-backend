const User = require("../db/model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  // Object destructuring
  const { email, password } = req.body;

  // Check if user exists
  User.findOne({ email: email })
    .then(async (user) => {
      // If user exists, compare password using bcrypt
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // If password matches, generate json web token
            const token = jwt.sign(
              { _id: user._id, email: user.email },
              "RANDOM_TOKEN",
              { expiresIn: "6h" }
            );
            // Send success message
            res.status(200).send({
              message: "Login successful",
              email: user.email,
              token,
              todos: user.todos,
            });
          } else {
            // If password does not match, send error message
            res.status(400).send({ message: "Email or Password is wrong" });
          }
        })
        .catch((err) => {
          // If password does not match, send error message
          res
            .status(400)
            .send({ message: "Invalid credentials 2", error: err });
        });
    })
    .catch((err) => {
      // If user does not exist, send error message
      res.status(404).send({ message: "User not found", err });
    });
};

module.exports = login;
