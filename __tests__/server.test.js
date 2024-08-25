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
          body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("description", expect.any(String));
            expect(topic).toHaveProperty("slug", expect.any(String));
          });
        });
    });
  });
});
