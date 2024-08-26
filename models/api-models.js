const fs = require("fs/promises");

exports.getEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`).then((endPoints) => {
    parsedEndPoints = JSON.parse(endPoints);
    return parsedEndPoints;
  });
};
