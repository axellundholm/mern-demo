import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as customerController from "../controllers/customerController.js";

const router = express.Router();

router.get("/sync", asyncHandler(customerController.syncCustomers));
router.post("/", asyncHandler(customerController.createCustomer));
router.get("/", asyncHandler(customerController.listCustomers));
router.get("/:id", asyncHandler(customerController.getCustomer));
router.put("/:id", asyncHandler(customerController.updateCustomer));
router.delete("/:id", asyncHandler(customerController.deleteCustomer));

export default router;
