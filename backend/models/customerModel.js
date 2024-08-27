import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    legalEntityId: {
      type: String,
      required: true,
    },
    accountHolderId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export const Customer = mongoose.model("Cat", customerSchema);
