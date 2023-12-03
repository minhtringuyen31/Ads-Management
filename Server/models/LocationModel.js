import mongoose from "mongoose";

const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    locations: {
        address: {
            type: String,
            required: true,
        },
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
        ward_id: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Ward',
        },
        area_type: {
            type: String,
            required: true,
            enum: ['Motorbike', 'Car'],
        },
        ads_type: {
            type: String,
            required: true,
            enum: ['Motorbike', 'Car'],
        },
        image: {
            type: Array,
            required: true,
        },
        is_planned: {
            type: Boolean,
            default: false,
        },
    }
},

    {
        timestamps: true,
    }
);

export const Location = mongoose.model('Location', LocationSchema);