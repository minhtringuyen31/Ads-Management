import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AuthorizeRequestSchema = new Schema(
  {
    authorizeRequests: {
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
        enum: ["Pending", "Complete", "Cancelled"],
        default: "Pending",
        required: true,
      },
    },
  },

  {
    timestamps: true,
  }
);

export const Report = mongoose.model(
  "Authorize Request",
  AuthorizeRequestSchema
);
