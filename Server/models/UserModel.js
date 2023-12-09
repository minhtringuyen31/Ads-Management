import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png",
    },
    dob: {
        type: Date,
    },
    userRole: {
        type: String,
        required: true,
        enum: ['anonymous', 'admin', 'ward_officer', 'district_officer'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
},
    {
        timestamps: true,
    }
);
const AnonymousSchema = new Schema(UserSchema);
const AdminSchema = new Schema(UserSchema);
const WardOfficerSchema = new Schema(UserSchema);

WardOfficerSchema.add({
    assigned_areaid: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Ward',
    },
});
DistrictOfficer.add({
    assigned_areaid: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'Ward',
    },
});
const DistrictOfficerSchema = new Schema(UserSchema);

export const User = mongoose.model('User', UserSchema);
export const Admin = User.discriminator('WardOfficer', WardOfficerSchema);
export const WardOfficer = User.discriminator('WardOfficer', AdminSchema);
export const Anonymous = User.discriminator('Anonymous', AnonymousSchema);
export const DistrictOfficer = User.discriminator('DistrictOfficer', DistrictOfficerSchema);