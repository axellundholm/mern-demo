import express from "express";
import { Customer } from "../models/customerModel.js";
import "dotenv/config";

import pkg from "@adyen/api-library";
import { LegalEntityInfo } from "@adyen/api-library/lib/src/typings/legalEntityManagement/legalEntityInfo.js";
import { LegalEntityInfoRequiredType } from "@adyen/api-library/lib/src/typings/legalEntityManagement/legalEntityInfoRequiredType.js";
const { Client, BalancePlatformAPI, LegalEntityManagementAPI } = pkg;

const router = express.Router();

const lemClient = new Client({
  apiKey: process.env.LEM_API_KEY,
  environment: "TEST",
});
const bclClient = new Client({
  apiKey: process.env.BCL_API_KEY,
  environment: "TEST",
});
const lemAPI = new LegalEntityManagementAPI(lemClient);
const bclAPI = new BalancePlatformAPI(bclClient);

router.get("/sync", async (req, res) => {
  try {
    const _ = await Customer.deleteMany();

    const bclResponse =
      await bclAPI.PlatformApi.getAllAccountHoldersUnderBalancePlatform(
        "AxelCorpBP",
        null,
        100
      );
    const activeAccountHolders = bclResponse.accountHolders.filter(
      (ah) => ah.status != "closed"
    );

    activeAccountHolders.forEach(async (ah) => {
      const newCustomer = {
        accountHolderId: ah.id,
        legalEntityId: ah.legalEntityId,
      };
      let _ = await Customer.create(newCustomer);
    });

    res.status(200).send(activeAccountHolders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/test", async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).send("success");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.type ||
      !req.body.organization.legalName ||
      !req.body.organization.registeredAddress.country
    ) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }

    const lemResponse = await lemAPI.LegalEntitiesApi.createLegalEntity({
      type: "organization",
      organization: {
        legalName: req.body.organization.legalName,
        registrationNumber: req.body.organization.registrationNumber,
        vatNumber: req.body.organization.vatNumber,
        type: req.body.organization.type,
        registeredAddress: {
          country: req.body.organization.registeredAddress.country,
          city: req.body.organization.registeredAddress.city,
          postalCode: req.body.organization.registeredAddress.postalCode,
          street: req.body.organization.registeredAddress.street,
        },
      },
    });

    const bclResponse = await bclAPI.AccountHoldersApi.createAccountHolder({
      legalEntityId: lemResponse.id,
    });

    const newCustomer = {
      accountHolderId: bclResponse.id,
      legalEntityId: bclResponse.legalEntityId,
    };

    const customer = await Customer.create(newCustomer);

    return res.status(200).send(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (_, res) => {
  try {
    const customers = await Customer.find({});

    res.status(200).send({
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    res.status(200).send(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.legalEntityId || !req.body.accountHolderId) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }

    const { id } = req.params;

    const result = await Customer.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).send({ message: "Customer updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Customer.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).send({ message: "Customer deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
