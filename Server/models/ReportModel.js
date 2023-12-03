import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ReportSchema = new Schema(
  {
    report_form: {
      type: String,
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
    related_to: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["denounce", "register", "feedback", "question"],
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
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
