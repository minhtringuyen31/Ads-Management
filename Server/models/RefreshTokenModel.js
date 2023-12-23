import mongoose from "mongoose";

const RefreshTokenStatus = {
  ACTIVE: 'active',
  REVOKED: 'revoked',
};

const Schema = mongoose.Schema;
const RefreshTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(RefreshTokenStatus),
      default: RefreshTokenStatus.ACTIVE,
    },
  },
);

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
