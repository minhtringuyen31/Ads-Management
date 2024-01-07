import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },
    type: {
        type: String
    },
    content: {
        type: Object
    },
    is_read: {
        type: Boolean,
        default: false,
    },
    clientId: {
        type: String
    }
},
    {
        timestamps: true,
    }
);

export const NotificationModel = mongoose.model('Notification', NotificationSchema);