import mongoose from "mongoose";

const Schema = mongoose.Schema;
const reportFormEnum = {
  denounce: "Tố giác sai phạm",
  register: "Đăng ký nội dung",
  feedback: "Đóng góp ý kiến",
  question: "Giải đáp thắc mắc",
};
const ReportSchema = new Schema(
  {
    report_form: {
      type: String,
      enum: Object.keys(reportFormEnum),
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
      ref: "Location",
    },
    board: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "AdsBoard",
    },
    images: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      required: true,
    },
    image: {
      type: [String],
    },
    operation: {
      user: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
      content: {
        type: String,
        required: false,
      },
    },
    // Add by Quang Thanh to support socket IO
    code: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", ReportSchema);
