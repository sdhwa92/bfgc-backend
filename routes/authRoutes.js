const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authJWT");

module.exports = (app, passport) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect(keys.clientSideDomain);
    }
  );

  app.post("/api/login", (req, res) => {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not Found." });
        }

        // comparing passwords
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res
            .status(401)
            .send({ accessToken: null, message: "Invalid Password!" });
        }

        // signing token with user id
        const token = jwt.sign(
          {
            id: user.id,
          },
          keys.apiSecret,
          {
            expiresIn: 24 * 60 * 60 * 1000,
          }
        );

        // responding to client request with user profile success message and access token.
        res.status(200).send({
          user: {
            id: user._id,
            email: user.email,
          },
          message: "Login Successfully",
          accessToken: token,
        });
      }
    );
  });

  app.post("/api/register", (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw err;
      if (user) res.send("User Already Exists");
      if (!user) {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
        newUser.save((err, user) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
            return;
          }

          res.status(200).send({ message: "User registered successfully" });
        });
      }
    });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    // The req.user stores the entire user that has been authenticated inside of it.
    res.send(req.user);
  });

  app.get("/api/hiddencontent", verifyToken, function (req, res) {
    if (!req.user) {
      return res.status(403).send({
        message: "Invalid JWT token",
      });
    }

    res.status(200).send({
      message: "You are authorised to this content",
    });
  });
};
