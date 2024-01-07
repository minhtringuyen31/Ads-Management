import mongoose from "mongoose";

const Schema = mongoose.Schema;
const EditRequestSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["location", "board"],
      required: true,
    },
    newInformation: {
      type: Object,
      required: true,
    },
    reason: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "completed", 'rejected', 'canceled'],
      default: "pending",
      required: true,
    }
  },

  {
    timestamps: true,
  }
);

export const EditRequest = mongoose.model("EditRequest", EditRequestSchema);
