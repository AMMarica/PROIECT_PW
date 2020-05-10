const {
    Questions
} = require('../data');

const add = async (question, email) => {
    const newQuestion = new Questions({
        question,
        email
    });
    await newQuestion.save();
};

const getAll = async () => {
    const questions = await Questions.find();
    return questions;
};

const updateResponse = async (id, response) => {
    await Questions.findByIdAndUpdate(id, {
        response
    });
    const question = await Questions.findById(id);
    return question;
};

const updateImportance = async (id, imp) => {
    const question = await Questions.findById(id);
    await Questions.findByIdAndUpdate(id, { important: !question.important });
}

const deleteById = async (id) => {
    await Questions.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    updateResponse,
    updateImportance,
    deleteById
}