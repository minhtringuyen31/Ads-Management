import mongoose from "mongoose";
import { AdsBoard } from "./AdsBoardModel.js";
const Schema = mongoose.Schema;
const AuthorizeRequestSchema = new Schema(
  {
    new_ads_board: {
      location: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Location',
      },
      adsboard_type: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Type',
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      contract_end_date: {
        type: Date,
        required: true,

      },
      contract_start_date: {
        type: Date,
        required: true,

      },
      image: {
        type: [String],
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      contact_name_person: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: false, // Có thể là không bắt buộc
      },
      description: {
        type: String,
        required: false, // Có thể là không bắt buộc
      },
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "rejected"],
      default: "pending",
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: 0,
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
