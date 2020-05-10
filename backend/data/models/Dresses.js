const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DressSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const DressModel = mongoose.model('DressModel', DressSchema);
module.exports = DressModel;
