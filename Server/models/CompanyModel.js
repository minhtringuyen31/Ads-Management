import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact_name_person: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false, // Có thể là không bắt buộc
    },
    description: {
        type: String,
        required: false, // Có thể là không bắt buộc
    },

});
export const Company = mongoose.model('Company', CompanySchema);