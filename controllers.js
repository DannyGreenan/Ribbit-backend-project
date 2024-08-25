const { getAllTopics } = require("./models");

exports.getTopics = (req, res) => {
  getAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
