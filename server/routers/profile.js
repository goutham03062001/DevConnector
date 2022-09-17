const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Profile = require("../models/Profile");

//@route    GET api/all profile
//@desc     Test Route
//@access   Private

router.get("/all", auth, async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "email"]);
    if (!profile) {
      return res.send("no profile is there for this user");
    } else {
      return res.json(profile);
    }
  } catch (error) {
    console.log("server error : ", error.message);
  }
});

//@route    POST api/profile/
//@desc     Create or update a profile
//@access   Private

router.post("/", auth, async (req, res) => {
  const { skills, status } = req.body;
  if (!skills || !status) {
    return res.json({ message: "please fill all the details" });
  } else {
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      experience,
      education,
      social,
    } = req.body;
    const profileField = {};

    //to link the user with his profile we need to put profileFields.id = req.user.id (it means current logged in user);

    profileField.user = req.user.id;

    if (company) {
      profileField.company = company;
    }
    if (website) {
      profileField.website = website;
    }
    if (location) {
      profileField.status = status;
    }

    if (skills) {
      profileField.skills = skills.split(",").map((skill) => skill.trim());
    }
    // console.log(profileField.skills)
    if (bio) {
      profileField.bio = bio;
    }
    if (githubusername) {
      profileField.githubusername = githubusername;
    }

    //build an object for the social
    profileField.social = {}; // just initialize
    if (social) {
      profileField.social.instagram = social.instagram;
      profileField.social.youtube = social.youtube;
      profileField.social.linkedin = social.linkedin;
      profileField.social.twitter = social.twitter;
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //it means profile is existed we need to update it

        await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );
        await Profile.save();
        return res.json(profile);
      } else {
        console.log(profileField);

        const newProfile = new Profile(profileField);

        res.json(newProfile);
      }
    } catch (error) {
      console.log("Server error");
      res.send(error.message);
    }
  }
});

//@route    GET api/profile/user/:id
//@desc     show profile details
//@access   Private

router.get("/user/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        message: "no profile found",
      });
    } else {
      return res.status(200).json({
        message: "profile found",
        profile,
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json("no profile found");
    }
    return res.status(500).send(`server error : ${error.message}`);
  }
});

//@route    DELETE api/user/:id
//@desc     delete a user and his all things
//@access   Private
router.delete("/user/:id", auth, async (req, res) => {
  try {
    //@todo - remove users post

    //remove  profile
    await Profile.findOneAndDelete({ user: req.user.id });

    //remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ message: "User deleted" });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json("no profile found");
    }
    console.log("server error : ", error.message);
  }
});

//@route    PUT api/profile/experience
//@desc     add experience
//@access   Private

router.put("/experience", auth, async (req, res) => {
  try {
    const { title, company, location, from, to, current, description } =
      req.body;

    if (!title || !company || !location || !from || !description) {
      res.send("Please fill all the details");
    } else {
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp); //unshift is something like push;
      await profile.save();
      res.json(profile);
    }
  } catch (error) {
    console.log("server error");
    res.status(500).send(`Server Error : ${error.message}`);
  }
});

//@route    DELETE api/experience
//@desc     delete the current user experience
//@access   Private
router.delete("/experience", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //remove the last experience
    const deletedExp = profile.experience;
    deletedExp.remove();
    res.send("your experience is deleted");
    // console.log("your deleted experience " ,deletedExp);
    // console.log(profile);
  } catch (error) {
    console.log("Server Error", error.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/experience
//@desc     get the current experience
//@access   Private

router.get("/experience", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //show all the current Experience
    res.json(profile);
  } catch (error) {
    console.log("Server Error");
    res.send(`Server Error : ${error.message}`);
  }
});
module.exports = router;
