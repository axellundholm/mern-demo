import { Customer } from "../models/customerModel.js";
import { ApiError } from "../middleware/errorHandler.js";
import * as adyenService from "./adyenService.js";

const BALANCE_PLATFORM = "AxelCorpBP";

export async function syncCustomers() {
  await Customer.deleteMany();

  const activeAccountHolders =
    await adyenService.getActiveAccountHolders(BALANCE_PLATFORM);

  await Customer.insertMany(
    activeAccountHolders.map((ah) => ({
      accountHolderId: ah.id,
      legalEntityId: ah.legalEntityId,
    })),
  );

  return activeAccountHolders;
}

export async function createCustomer(payload) {
  const organization = payload.organization;

  if (
    !payload.type ||
    !organization ||
    !organization.legalName ||
    !organization.registeredAddress ||
    !organization.registeredAddress.country
  ) {
    throw new ApiError(400, "Send all required fields");
  }

  const legalEntity = await adyenService.createLegalEntity(organization);
  const accountHolder = await adyenService.createAccountHolder(legalEntity.id);

  return Customer.create({
    accountHolderId: accountHolder.id,
    legalEntityId: accountHolder.legalEntityId,
  });
}

export async function listCustomers() {
  const customers = await Customer.find({});
  return { count: customers.length, data: customers };
}

export async function getCustomerById(id) {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  return customer;
}

export async function updateCustomer(id, payload) {
  if (!payload.legalEntityId || !payload.accountHolderId) {
    throw new ApiError(400, "Send all required fields");
  }

  const result = await Customer.findByIdAndUpdate(id, payload);
  if (!result) {
    throw new ApiError(404, "Customer not found");
  }
}

export async function deleteCustomer(id) {
  const result = await Customer.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(404, "Customer not found");
  }
}
