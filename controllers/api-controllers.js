const { getEndpoints } = require("../models/api-models");

exports.getApi = (req, res, next) => {
  getEndpoints()
    .then((endPoints) => {
      res.status(200).send({ endPoints });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.handleInvalidMethod = (req, res) => {
  res.set("allow", "GET");
  res.status(405).send({ msg: "Method Not Allowed" });
};
