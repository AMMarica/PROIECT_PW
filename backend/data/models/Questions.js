const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    response: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    important: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const QuestionModel = mongoose.model('Question', QuestionSchema);
module.exports = QuestionModel;
