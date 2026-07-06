import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";

vi.mock("../services/customerService.js", () => ({
  syncCustomers: vi.fn(),
  createCustomer: vi.fn(),
  listCustomers: vi.fn(),
  getCustomerById: vi.fn(),
  updateCustomer: vi.fn(),
  deleteCustomer: vi.fn(),
}));

import * as customerService from "../services/customerService.js";
import { ApiError, errorHandler, notFoundHandler } from "../middleware/errorHandler.js";
import customerRoute from "../routes/customerRoute.js";

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/customers", customerRoute);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

describe("customer routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /customers returns the customer list", async () => {
    customerService.listCustomers.mockResolvedValue({ count: 1, data: [{ _id: "1" }] });

    const response = await request(buildApp()).get("/customers");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ count: 1, data: [{ _id: "1" }] });
  });

  it("POST /customers returns 400 when the service rejects invalid input", async () => {
    customerService.createCustomer.mockRejectedValue(
      new ApiError(400, "Send all required fields"),
    );

    const response = await request(buildApp()).post("/customers").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Send all required fields");
  });

  it("PUT /customers/:id returns the error response instead of throwing on failure", async () => {
    customerService.updateCustomer.mockRejectedValue(new ApiError(404, "Customer not found"));

    const response = await request(buildApp())
      .put("/customers/507f1f77bcf86cd799439011")
      .send({ legalEntityId: "le_1", accountHolderId: "ah_1" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Customer not found");
  });

  it("DELETE /customers/:id returns the error response instead of throwing on failure", async () => {
    customerService.deleteCustomer.mockRejectedValue(new ApiError(404, "Customer not found"));

    const response = await request(buildApp()).delete(
      "/customers/507f1f77bcf86cd799439011",
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Customer not found");
  });
});
