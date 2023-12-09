import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TypeSchema = new Schema({
    label: {
        type: String,
    },
    key: {
        type: String,
        required: true,
    }
});
// AdsBoardTypeSchema: enum: ['hiflex_banner_stand', 'led', 'lightbox_stand', 'wall_mounted_hiflex_banner', 'wall_mounted_led_screen', 'vertical_banner_hanging_stand', 'horizontal_banner_hanging_stand', 'billboard_stand', 'welcome_gate', 'shopping_center'],
const AdsBoardTypeSchema = new Schema(TypeSchema);
// Add more field here if needed reference to UserModel.js

// AdsTypeSchema: enum: ['political_propaganda', 'commercial_advertising', 'socialization'],
const AdsTypeSchema = new Schema(TypeSchema);

// LocationTypeSchema: enum: ['public_land', 'park', 'safe_traffic_corridor', 'private_land', 'family_home', 'mall', 'market', 'gas_station', 'bus_stop'],
const LocationTypeSchema = new Schema(TypeSchema);


export const Type = mongoose.model('Type', TypeSchema);
export const AdsBoardType = Type.discriminator('AdsBoardType', AdsBoardTypeSchema);
export const AdsType = Type.discriminator('AdsType', AdsTypeSchema);
export const LocationType = Type.discriminator('LocationType', LocationTypeSchema);