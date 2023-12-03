import mongoose from "mongoose";

const Schema = mongoose.Schema;
const WardSchema = new Schema({
    name: {
        type: String,
        required: true,

    }
});

export const Ward = mongoose.model('Ward', WardSchema);