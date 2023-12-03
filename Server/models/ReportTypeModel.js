import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ReportTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});