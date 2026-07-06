import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import customerRoute from "./routes/customerRoute.js";
import { config } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: config.frontendOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to AxelCorp onboarding...");
});

app.use("/customers", customerRoute);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(config.mongodbUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export default app;
