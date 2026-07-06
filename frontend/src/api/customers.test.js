import { describe, it, expect, vi } from "vitest";

vi.mock("./client", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import { apiClient } from "./client";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "./customers";

describe("customers api layer", () => {
  it("getCustomers calls GET /customers", () => {
    getCustomers();
    expect(apiClient.get).toHaveBeenCalledWith("/customers");
  });

  it("getCustomer calls GET /customers/:id", () => {
    getCustomer("123");
    expect(apiClient.get).toHaveBeenCalledWith("/customers/123");
  });

  it("createCustomer calls POST /customers with the payload", () => {
    const payload = { type: "organization" };
    createCustomer(payload);
    expect(apiClient.post).toHaveBeenCalledWith("/customers", payload);
  });

  it("updateCustomer calls PUT /customers/:id with the payload", () => {
    const payload = { legalEntityId: "le", accountHolderId: "ah" };
    updateCustomer("123", payload);
    expect(apiClient.put).toHaveBeenCalledWith("/customers/123", payload);
  });

  it("deleteCustomer calls DELETE /customers/:id", () => {
    deleteCustomer("123");
    expect(apiClient.delete).toHaveBeenCalledWith("/customers/123");
  });
});
