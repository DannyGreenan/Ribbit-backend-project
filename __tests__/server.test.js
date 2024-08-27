const db = require("../db/connection");
const app = require("../server");
const data = require("../db/data/test-data");
const request = require("supertest");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("backend API project", () => {
  describe("general error tests", () => {
    test("that it should return a 404 for a non-existing route", () => {
      return request(app)
        .get("/not-a-route")
        .expect(404)
        .then((error) => {
          expect(error.text).toContain("Cannot GET /not-a-route");
        });
    });
  });
  describe("GET /api/topics", () => {
    test("that a request to /api/topics responds with an array of topic Objects with slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.topics)).toBe(true);
          expect(body.topics.length).toBeGreaterThan(0);
          body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("description", expect.any(String));
            expect(topic).toHaveProperty("slug", expect.any(String));
          });
        });
    });
    test("that path responds with 405 Method Not Allowed if method type is invalid", () => {
      const invalidMethods = ["post", "patch", "delete"];

      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]("/api/topics").expect(405);
      });
      return Promise.all(methodPromises);
    });
  });
  describe("GET /api", () => {
    test("that a GET request to /api responds with an array of all the available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body.endPoints).toBe("object");
          expect(body.endPoints["GET /api"]).toHaveProperty(
            "description",
            expect.any(String)
          );
        });
    });
    test("that path responds with 405 Method Not Allowed if method type is invalid", () => {
      const invalidMethods = ["post", "patch", "delete"];

      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]("/api").expect(405);
      });
      return Promise.all(methodPromises);
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("that a GET request to /api/articles/:article_id responds with the correct article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body.article).toBe("object");
          expect(body.article).toHaveProperty("author", expect.any(String));
          expect(body.article).toHaveProperty("title", expect.any(String));
          expect(body.article).toHaveProperty("article_id", expect.any(Number));
          expect(body.article).toHaveProperty("body", expect.any(String));
          expect(body.article).toHaveProperty("topic", expect.any(String));
          expect(body.article).toHaveProperty("created_at", expect.any(String));
          expect(body.article).toHaveProperty("votes", expect.any(Number));
          expect(body.article).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
        });
    });
    test("that path responds with 405 Method Not Allowed if method type is invalid", () => {
      const invalidMethods = ["post", "patch", "delete"];

      const methodPromises = invalidMethods.map((method) => {
        return request(app)[method]("/api").expect(405);
      });
      return Promise.all(methodPromises);
    });
    test("that a GET request to /api/articles/:article_id with a correct id that does not exist responds with 404 Article not found", () => {
      return request(app)
        .get("/api/articles/2024")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
    test("that a GET request to /api/articles/:article_id with a incorrect id type responds with a 400 Bad Request", () => {
      return request(app)
        .get("/api/articles/badrequest")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
  describe("GET /api/articles", () => {
    test("that a GET request to /api/articles returns an array of article objects with the correct properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.articles)).toBe(true);
          expect(body.articles.length).toBeGreaterThan(0);
          body.articles.forEach((article) => {
            expect(article).toHaveProperty("author", expect.any(String));
            expect(article).toHaveProperty("title", expect.any(String));
            expect(article).toHaveProperty("article_id", expect.any(Number));
            expect(article).toHaveProperty("topic", expect.any(String));
            expect(article).toHaveProperty("created_at", expect.any(String));
            expect(article).toHaveProperty("votes", expect.any(Number));
            expect(article).toHaveProperty(
              "article_img_url",
              expect.any(String)
            );
            expect(article).toHaveProperty("comment_count", expect.any(String));
            expect(article).not.toHaveProperty("body");
          });
        });
    });
    test("that the articles are ordered by created_at by default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
  });
});
