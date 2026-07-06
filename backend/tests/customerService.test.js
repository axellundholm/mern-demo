import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/customerModel.js", () => ({
  Customer: {
    create: vi.fn(),
    find: vi.fn(),
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
    deleteMany: vi.fn(),
    insertMany: vi.fn(),
  },
}));

vi.mock("../services/adyenService.js", () => ({
  createLegalEntity: vi.fn(),
  createAccountHolder: vi.fn(),
  getActiveAccountHolders: vi.fn(),
}));

import { Customer } from "../models/customerModel.js";
import * as adyenService from "../services/adyenService.js";
import * as customerService from "../services/customerService.js";

describe("customerService.createCustomer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects when organization is missing", async () => {
    await expect(customerService.createCustomer({ type: "organization" })).rejects.toMatchObject({
      statusCode: 400,
    });
  });

  it("rejects when organization.legalName is missing", async () => {
    await expect(
      customerService.createCustomer({
        type: "organization",
        organization: { registeredAddress: { country: "SE" } },
      }),
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("creates a customer once Adyen calls succeed", async () => {
    adyenService.createLegalEntity.mockResolvedValue({ id: "le_1" });
    adyenService.createAccountHolder.mockResolvedValue({
      id: "ah_1",
      legalEntityId: "le_1",
    });
    Customer.create.mockResolvedValue({ accountHolderId: "ah_1", legalEntityId: "le_1" });

    const result = await customerService.createCustomer({
      type: "organization",
      organization: { legalName: "AxelCorp", registeredAddress: { country: "SE" } },
    });

    expect(adyenService.createLegalEntity).toHaveBeenCalled();
    expect(adyenService.createAccountHolder).toHaveBeenCalledWith("le_1");
    expect(Customer.create).toHaveBeenCalledWith({
      accountHolderId: "ah_1",
      legalEntityId: "le_1",
    });
    expect(result).toEqual({ accountHolderId: "ah_1", legalEntityId: "le_1" });
  });
});

describe("customerService.updateCustomer / deleteCustomer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws a 404 ApiError when the customer to update does not exist", async () => {
    Customer.findByIdAndUpdate.mockResolvedValue(null);

    await expect(
      customerService.updateCustomer("1", { legalEntityId: "le", accountHolderId: "ah" }),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("throws a 404 ApiError when the customer to delete does not exist", async () => {
    Customer.findByIdAndDelete.mockResolvedValue(null);

    await expect(customerService.deleteCustomer("1")).rejects.toMatchObject({
      statusCode: 404,
    });
  });
});
