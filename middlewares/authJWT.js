const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys");

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      keys.apiSecret,
      function (err, decode) {
        if (err) {
          req.user = undefined;
        }
        User.findOne(
          {
            _id: decode.id,
          },
          (err, user) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
            } else {
              req.user = user;
              next();
            }
          }
        );
      }
    );
  } else {
    req.user = "undefined";
    next();
  }
};

module.exports = verifyToken;
