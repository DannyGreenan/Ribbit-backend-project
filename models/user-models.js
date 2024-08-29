const db = require("../db/connection");

exports.returnUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

exports.returnUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE users.username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User not found" });
      }
      return rows[0];
    });
};
