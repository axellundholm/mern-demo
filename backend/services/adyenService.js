import pkg from "@adyen/api-library";
import { config } from "../config/env.js";

const { Client, BalancePlatformAPI, LegalEntityManagementAPI } = pkg;

const lemClient = new Client({
  apiKey: config.lemApiKey,
  environment: "TEST",
});
const bclClient = new Client({
  apiKey: config.bclApiKey,
  environment: "TEST",
});

const lemAPI = new LegalEntityManagementAPI(lemClient);
const bclAPI = new BalancePlatformAPI(bclClient);

export async function createLegalEntity(organization) {
  return lemAPI.LegalEntitiesApi.createLegalEntity({
    type: "organization",
    organization: {
      legalName: organization.legalName,
      registrationNumber: organization.registrationNumber,
      vatNumber: organization.vatNumber,
      type: organization.type,
      registeredAddress: {
        country: organization.registeredAddress.country,
        city: organization.registeredAddress.city,
        postalCode: organization.registeredAddress.postalCode,
        street: organization.registeredAddress.street,
      },
    },
  });
}

export async function createAccountHolder(legalEntityId) {
  return bclAPI.AccountHoldersApi.createAccountHolder({ legalEntityId });
}

export async function getActiveAccountHolders(balancePlatform) {
  const response =
    await bclAPI.PlatformApi.getAllAccountHoldersUnderBalancePlatform(
      balancePlatform,
      null,
      100,
    );

  return response.accountHolders.filter((ah) => ah.status !== "closed");
}
