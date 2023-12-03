import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RefreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiration: {
      type: Date,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
