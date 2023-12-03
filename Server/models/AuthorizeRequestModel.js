import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AuthorizeRequestSchema = new Schema(
  {
    locationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Location",
    },
    newInformation: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const AuthorizeRequest = mongoose.model(
  "AuthorizeRequest",
  AuthorizeRequestSchema
);
