const db = require("../db/connection");

exports.getCommentById = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comments.comment_id = $1`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

exports.deleteCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return `deleted comment ${comment_id}`;
    });
};

exports.patchCommentVotesById = (comment_id, inc_votes) => {
  let queryStr = `UPDATE comments SET votes = votes`;

  let queryValues = [];

  if (inc_votes && isNaN(inc_votes)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else if (inc_votes > 0) {
    queryValues.push(inc_votes);
    queryStr += ` + $1`;
  } else if (inc_votes < 0) {
    queryValues.push(Math.abs(inc_votes));
    queryStr += ` - $1`;
  } else {
    queryValues.push(0);
    queryStr += ` + $1`;
  }

  queryValues.push(comment_id);

  queryStr += ` WHERE comments.comment_id = $2 RETURNING *`;

  return db.query(`${queryStr}`, queryValues).then(({ rows }) => {
    return rows[0];
  });
};
