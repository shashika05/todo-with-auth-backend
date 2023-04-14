const User = require("../db/model/UserModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then(async (user) => {
    if (user) {
      res.status(400).send({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: email,
        password: hashedPassword,
      });

      newUser
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User created",
            result,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: "Error creating user", err });
        });
    }
  });
};

module.exports = register;
