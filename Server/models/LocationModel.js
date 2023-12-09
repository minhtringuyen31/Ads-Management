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
        address: {
            type: String,
            required: true,
        }
    },
    ward_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Ward',
    },
    location_type: {
        type: String,
        required: true,
    },
    ads_type: {
        type: String,
        required: true,
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