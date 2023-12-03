import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AdsBoardSchema = new Schema({
    location_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Location',
    },
    type: {
        type: String,
        required: true,
        enum: ['hiflex_banner_stand', 'led', 'lightbox_stand', 'wall_mounted_hiflex_banner',
            'wall_mounted_led_screen', 'vertical_banner_hanging_stand', 'horizontal_banner_hanging_stand',
            'billboard_stand', 'cluster', 'welcome_gate', 'shopping_center'],
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
        ref: 'Company' // Assuming you have a Company model
    }
},

    {
        timestamps: true,
    }
);

export const AdsBoard = mongoose.model('AdsBoard', AdsBoardSchema);