const mongoose = require("mongoose");
const verifyToken = require("../middlewares/authJWT");

const Template = mongoose.model("Template");

module.exports = (app) => {
  app.get("/api/templates", verifyToken, (req, res) => {
    res.status(200).send({
      message: "You are authorised to this content",
    });
  });

  app.post("/api/templates", verifyToken, async (req, res) => {
    const { name, fields, type } = req.body;

    const template = new Template({
      name,
      type,
      createdAt: Date.now(),
      _createdBy: req.user.id,
      fields,
    });

    try {
      const templateSaved = await template.save();

      res.status(201).send(templateSaved);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put("/api/templates/:id", verifyToken, (req, res) => {});
};
