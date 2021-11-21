import httpMocks from "node-mocks-http";

jest.mock("express-validator", () => ({
  validationResult: jest
    .fn()
    .mockReturnValueOnce({
      array: jest.fn(() => [{ error: "Mocked error" }]),
    })
    .mockReturnValue({ array: () => [] }),
}));

describe("validationRequest middleware", () => {
  it("should return error", () => {
    const validateRequest = require("../validateRequest").default;

    const req = httpMocks.createRequest({ isAuthenticated: () => false });

    const res = httpMocks.createResponse();

    validateRequest(req, res, jest.fn());
    expect(res.statusCode).toEqual(400);
  });

  it("should return no error", () => {
    const validateRequest = require("../validateRequest").default;

    const req = httpMocks.createRequest({ isAuthenticated: () => false });

    const res = httpMocks.createResponse();
    validateRequest(req, res, jest.fn());
    expect(res.statusCode).toEqual(200);
  });
});
