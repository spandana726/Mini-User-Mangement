import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/User.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Authentication Tests", () => {
  test("Signup should create a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "testuser@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("Login should authenticate user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Login should fail with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword"
    });

    expect(res.statusCode).toBe(401);
  });

  test("Protected route should fail without token", async () => {
    const res = await request(app).get("/api/users/me");
    expect(res.statusCode).toBe(401);
  });

  test("Signup should fail with duplicate email", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Another User",
      email: "testuser@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(409);
  });
});
    