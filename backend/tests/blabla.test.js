const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("test for Routes", () => {
  beforeEach(async () => {
    await api.get("/api/routes/delete");
    await api.get("/api/users/delete");
  });

  test("routes are returned as json", async () => {
    const u = {
      name: "test",
      username: "hey_from_tests",
      password: "123412341",
    };
    const savedUser = (await api.post("/api/users").send(u)).body;
    const route = {
      from: "test object",
      to: "test",
      driver: savedUser.id,
      passengers: [],
    };
    await api
      .post("/api/routes")
      .send(route)
      .set("Content-Type", "application/json");
    await api
      .get("/api/routes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all routes are returned ", async () => {
    const u = {
      name: "test",
      username: "hey_from_tests",
      password: "123412341",
    };
    const savedUser = (await api.post("/api/users").send(u)).body;
    const route = {
      from: "test object",
      to: "test",
      driver: savedUser.id,
      passengers: [],
    };

    await api
      .post("/api/routes")
      .send(route)
      .set("Content-Type", "application/json");
    const resp = await api.get("/api/routes");
    assert.strictEqual(resp.body.length, 1);
  });

  test("the route that i just sent is present", async () => {
    const u = {
      name: "test",
      username: "hey_from_tests",
      password: "123412341",
    };
    const savedUser = (await api.post("/api/users").send(u)).body;
    const route = {
      from: "test object",
      to: "test",
      driver: savedUser.id,
      passengers: [],
    };
    const resp = (
      await api
        .post("/api/routes")
        .send(route)
        .set("Content-Type", "application/json")
    ).body;

    const id = resp.data.id;
    const getResp = await api.get(`/api/routes/${id}`);

    assert.strictEqual(getResp.body.from, "test object");
    assert.strictEqual(getResp.body.to, "test");
    assert.strictEqual(getResp.body.driver, savedUser.id);
  });

  test("invalid route is not saved", async () => {
    const newRoute = {
      from: "test",
    };

    await api.post("/api/routes").send(newRoute).expect(400);
  });
});

describe("tests for Users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "test", passwordHash });

    await user.save();
  });
  test.only("get user by ID", async () => {
    const res = await api.get("/api/users");
    const [first] = res.body;
    console.log(first);
    const second = (await api.get(`/api/users/${first.id}`)).body;
    assert.deepStrictEqual(first, second);
  });
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = (await api.get("/api/users")).body;
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "sekret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = (await api.get("/api/users")).body;
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("TDD for duplicate usernames will not be allowed", async () => {
    const oldUsers = (await api.get("/api/users")).body;
    const duplicateUser = {
      username: "root",
      name: "test",
      password: "1234455",
    };
    const result = await api
      .post("/api/users")
      .send(duplicateUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const newUsers = (await api.get("/api/users")).body;
    assert(result.body.err.includes("expected `username` to be unique"));
    assert.strictEqual(oldUsers.length, newUsers.length);
  });
});
after(async () => {
  await mongoose.connection.close();
});
