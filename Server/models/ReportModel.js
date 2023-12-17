import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ReportSchema = new Schema(
  {
    report_form: {
      type: String,
      enum: ["denounce", "register", "feedback", "question"],
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone_number: {
      type: String,
      required: true,
    },
    report_content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["location", "board"],
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Location"
    },
    board: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "AdsBoard"
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      required: true,
    },
    operation: {
      type: String,
      require: false,
    },
  },

  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", ReportSchema);
