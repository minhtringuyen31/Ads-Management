import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AuthorizeRequestSchema = new Schema(
  {
    new_ads_board: {
      adsboard: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AdsBoard",
      },
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
