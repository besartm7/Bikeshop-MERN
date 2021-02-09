import mongoose from 'mongoose';

const settingSchema = mongoose.Schema({
    items:{
        type: Number,
        required: true,
        default: 10
    }
})

const Settings = mongoose.model('Settings', settingSchema);
export default Settings;