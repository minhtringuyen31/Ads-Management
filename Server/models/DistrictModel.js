import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DistrictSchema = new Schema({
    label: {
        type: String,

    },
    ward_ids: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'Ward',
    },
    coordinates: {
        type: [[Number]], // An array of arrays of numbers
        required: false
    }
});
export const District = mongoose.model('District', DistrictSchema);