import express, { response } from "express";
import mongoose from "mongoose";
import customerRoute from "./routes/customerRoute.js";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/", (req, res) => {
  console.log("Loading homepage");
  return res.status(200).send("Welcome to AxelCorp onboarding");
});

app.use("/customers", customerRoute);

mongoose
  .connect(MONGODB_URL)
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
