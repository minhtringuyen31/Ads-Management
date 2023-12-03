import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AdsBoardTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});