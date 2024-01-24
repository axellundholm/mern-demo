import express from "express";
import { Customer } from "../models/customerModel.js";
import "dotenv/config";

import pkg from "@adyen/api-library";
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

    const newCustomer = {};

    lemAPI.LegalEntitiesApi.createLegalEntity({
      type: req.body.type,
      organization: {
        legalName: req.body.organization.legalName,
        registeredAddress: {
          country: req.body.organization.registeredAddress.country,
        },
      },
    })
      .then((lemResponse) => {
        bclAPI.AccountHoldersApi.createAccountHolder({
          legalEntityId: lemResponse.id,
        })
          .then((bclResponse) => {
            newCustomer.accountHolderId = bclResponse.id;
            newCustomer.legalEntityId = bclResponse.legalEntityId;
          })
          .then(() => {
            const customer = Customer.create(newCustomer).then(() => {
              return res.status(200).send(customer);
            });
          });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
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
