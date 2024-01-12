import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AdsBoardSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Location',
    },
    adsboard_type: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Type',
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
    image: {
        type: [String],
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company', // Assuming you have a Company model
    },

},

    {
        timestamps: true,
    }
);

export const AdsBoard = mongoose.model('AdsBoard', AdsBoardSchema);