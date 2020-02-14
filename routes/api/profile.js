//get express
const express = require("express");
//get Router
const router = express.Router();
//get the profile schema
const Profile = require("../../models/Profile");
//get the user model
const User = require("../../models/User");
//get mongoose
const mongoose = require("mongoose");
//get passport
const passport = require("passport");
//get profile validation rules
const validateProfileInput = require("../../validation/profile");
//get the experience validation rules
const validateExperienceInput = require("../../validation/experience");
//get the education validation rules
const validateEducationInput = require("../../validation/education");

//@route    GET api/profile
//@desc     Test route
//@access   Public
router.get("/test", (req, res) => res.send("Profile route"));

//@route    GET api/profile/all
//@desc     Get all profiles
//@access   Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

//@route    GET api/profile/username/:username
//@desc     Get profile by username
//@access   Public
router.get("/username/:username", (req, res) => {
  const errors = {};
  Profile.findOne({ username: req.params.username })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.json(err));
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by ID
//@access   Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.json({ profile: "There is no profile for this user" }));
});

//@route    GET api/profile
//@desc     get current users profile
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    POST api/profile
//@desc     create or edit user profile
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Get the fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.LinkedIn) profileFields.LinkedIn = req.body.LinkedIn;
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create one
        //check if handle exists
        Profile.findOne({ username: profileFields.username }).then(profile => {
          if (profile) {
            errors.username = "That username already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route    POST api/profile/experience
//@desc     Add experience to profile
//@access   Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        company: req.body.company,
        JobTitle: req.body.JobTitle,
        Location: req.body.Location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current
      };
      //add new experience
      profile.Experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route    POST api/profile/education
//@desc     Add education to profile
//@access   Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        fieldOfStudy: req.body.fieldOfStudy,
        Location: req.body.Location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current
      };
      //add new experience
      profile.Education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete experience from profile
//@access   Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIdx = profile.Experience.map(item => item.id).indexOf(
        req.params.exp_id
      );
      profile.Experience.splice(removeIdx, 1);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

//@route    DELETE api/profile/education/:edu_id
//@desc     Delete education from profile
//@access   Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIdx = profile.Education.map(item => item.id).indexOf(
        req.params.exp_id
      );
      profile.Education.splice(removeIdx, 1);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

//@route    DELETE api/profile/
//@desc     Delete user and profile
//@access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

//export the router
module.exports = router;
