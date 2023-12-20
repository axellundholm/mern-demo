import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Customer } from "./models/customerModel.js";

const app = express();

app.use(express.json());

// Route handler for the /hello endpoint
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/", (req, res) => {
  console.log("Hello");
  return res.status(200).send("Test");
});

app.post("/customers", async (req, res) => {
  try {
    if (!req.body.legalEntityId || !req.body.accountHolderId) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }

    const newCustomer = {
      legalEntityId: req.body.legalEntityId,
      accountHolderId: req.body.accountHolderId,
    };

    const customer = await Customer.create(newCustomer);

    return res.status(200).send(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
