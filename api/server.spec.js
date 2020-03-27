const request = require("supertest");
const db = require("../data/dbConfig.js")
const server = require("./server.js");
const testHobbit = {name: "Shana"};

describe("server.js", function() {
  describe("GET /", function() {
    it("should return 200 OK (async version)", async function() {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
    });

    it("should return 200 OK", function() {
      return request(server)
        .get("/")
        .then(response => {
          expect(response.status).toBe(200);
        });
    });
 
    it("should return JSON", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it('should respond with { api: "up" }', function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.api).toBe("up");
        });
    });
  });
  describe("POST /", function() {
    it("it shoud return status code 201", async function() {
      await db("hobbits").truncate();
      request(server)
        .post("/hobbits")
        .send(testHobbit)
        .expect(201);
    });
    it("it shoud return JSON", async function() {
      await db("hobbits").truncate();
      request(server)
        .post("/hobbits")
        .send(testHobbit)
        .then(req => {
          expect(req.body).toMatch(/json/i)
        })
    });
  });
  describe("DELETE /", function() {
    it("should return a status code of 200", async function() {
      await db("hobbits")
      request(server)
        .delete("/hobbits/:id")
        .send({ id: 1 })
        .expect(200)
    });
    it("it shoud return JSON", async function() {
      await db("hobbits")
      request(server)
        .delete("/hobbits/:id")
        .then(res => {
          expect(res.body).toMatch(/json/i)
        })
    });
  });
});
// describe('server.js', function() {})
