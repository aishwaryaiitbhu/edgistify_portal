//get express
const express = require("express");
//get Router
const router = express.Router();
//Load user data model
const User = require("../../models/User");
//bcrypt for encrypting the password
const bcrypt = require("bcryptjs");
//jwt token for accessing protected routes
const jwt = require("jsonwebtoken");
const passport = require("passport");
//Load regstration validation rules
const validateRegisterInput = require("../../validation/resigter");
//Load login validation rules
const validateLoginInput = require("../../validation/login");
//@route    GET api/users/test
//@desc     Test route
//@access   Public
router.get("/test", (req, res) => res.send("User route"));

//@route    POST api/users/register
//@desc     register user
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/register
//@desc     Login user/generate JWT token for accessing protected routes
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    //check if user exists or not
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //check password if user exists
    bcrypt.compare(password, user.password).then(isMatch => {
      // send the JWT token if password matches only
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
        jwt.sign(
          payload,
          require("../../config/default").secretKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    POST api/users/current
//@desc     return current user
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

//export the router
module.exports = router;
