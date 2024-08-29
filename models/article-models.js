const db = require("../db/connection");

exports.articleById = (article_id, comment_count) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      article.rows[0].comment_count = comment_count;
      return article.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

exports.returnArticles = (query) => {
  const { sort_by, order, topic } = query;

  const allowedSortInputs = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
  ];

  if (sort_by && !allowedSortInputs.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  if (order && order !== "desc" && order !== "asc") {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`;

  if (topic) {
    queryStr += ` WHERE articles.topic = '${topic}' GROUP BY articles.article_id`;
  } else {
    queryStr += ` GROUP BY articles.article_id`;
  }

  if (sort_by) {
    queryStr += ` ORDER BY articles.${sort_by}`;
  } else {
    queryStr += ` ORDER BY articles.created_at`;
  }

  if (order) {
    queryStr += ` ${order.toUpperCase()}`;
  } else {
    queryStr += ` DESC`;
  }

  return db.query(`${queryStr}`).then(({ rows }) => {
    return rows;
  });
};

exports.returnsArticlesComments = (article_id) => {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, articles.article_id FROM comments JOIN articles ON comments.article_id = articles.article_id WHERE comments.article_id = $1 ORDER BY comments.created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.postNewComment = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};

exports.patchArticleById = (article_id, inc_votes) => {
  if (!inc_votes) {
    inc_votes = 0;
  }
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE articles.article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
