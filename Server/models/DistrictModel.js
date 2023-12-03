import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DistrictSchema = new Schema({
    name: {
        type: String,
        required: true,

    }
});
export const District = mongoose.model('District', DistrictSchema);