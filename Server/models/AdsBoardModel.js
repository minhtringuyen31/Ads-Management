import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AdsBoardSchema = new Schema({
    location_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Location',
    },
    type: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'AdsBoardType',
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    contract_end_date: {
        type: Date,
        required: true,

    },
    contract_start_date: {
        type: Date,
        required: true,

    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Assuming you have a Company model
        required: true,
    }
},

    {
        timestamps: true,
    }
);

export const AdsBoard = mongoose.model('AdsBoard', AdsBoardSchema);