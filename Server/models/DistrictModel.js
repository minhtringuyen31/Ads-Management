import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DistrictSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    ward_ids: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'Ward',
    },
});
export const District = mongoose.model('District', DistrictSchema);