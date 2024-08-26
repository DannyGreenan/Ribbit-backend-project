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
          console.log(body);
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
});
