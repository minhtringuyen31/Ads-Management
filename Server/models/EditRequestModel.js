import mongoose from "mongoose";

const Schema = mongoose.Schema;
const EditRequestSchema = new Schema(
  {
    editRequests: {
      type: {
        type: String,
        enum: ["Location", "Board"],
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
  },

  {
    timestamps: true,
  }
);

export const EditRequest = mongoose.model("Edit Request", EditRequestSchema);
