import request from "supertest";

describe("test App", () => {
  it("should return 302 when provided root path", async () => {
    const app = require("../app");
    const result = await request(app).get("/");
    expect(result.statusCode).toBe(302);
  });
});
