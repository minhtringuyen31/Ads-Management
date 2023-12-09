import mongoose from "mongoose";

const Schema = mongoose.Schema;
const WardSchema = new Schema({
    label: {
        type: String,
        required: true,
    },
    district_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'District',
    },
});

export const Ward = mongoose.model('Ward', WardSchema);