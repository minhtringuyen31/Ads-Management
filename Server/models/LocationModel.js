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

    },
    ward_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Ward',
    },
    location_type: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'LocationType',
    },
    ads_type: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AdsType',
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