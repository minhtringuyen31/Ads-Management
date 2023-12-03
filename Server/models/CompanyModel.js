import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,

    }
});
export const Company = mongoose.model('Company', CompanySchema);