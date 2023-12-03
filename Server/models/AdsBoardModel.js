import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AddBoardSchema = new Schema(

    {
        timestamps: true,
    }
);

export const Location = mongoose.model('Location', LocationSchema);