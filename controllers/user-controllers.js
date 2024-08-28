const { returnUsers } = require("../models/user-models");

exports.getUsers = (req, res, next) => {
  returnUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "GET");
  res.status(405).send({ msg: "Method Not Allowed" });
};
