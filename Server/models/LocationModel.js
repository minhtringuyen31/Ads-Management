import mongoose from "mongoose";

const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    coordinate: {
        lat: { // x
            type: Number,
            required: true,
        },
        lng: { // y
            type: Number,
            required: true,
        },
    },
    display_name: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    ward: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Ward',
    },
    district: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'District',
    },
    location_type: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Type',
    },
    ads_type: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Type',
    },
    image: {
        type: [String],
        required: true,
    },
    is_planned: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    }
);

export const Location = mongoose.model('Location', LocationSchema);