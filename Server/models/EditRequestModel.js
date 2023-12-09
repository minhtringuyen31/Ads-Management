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
  },

  {
    timestamps: true,
  }
);

export const EditRequest = mongoose.model("EditRequest", EditRequestSchema);
