const express = require('express');
const nodemailer = require("nodemailer");

const QuestionsService = require('./services.js');
const {
    validateFields
} = require('../utils');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');
const {
    ServerError
} = require('../errors');
const {
    authorizeRoles
} = require('../security/Roles');

const router = express.Router();

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/', authorizeAndExtractToken, authorizeRoles('user'), async (req, res, next) => {
    const {
        email,
        question
    } = req.body;

    try {
        const fieldsToBeValidated = {
            question: {
                value: question,
                type: 'ascii'
            },
            email: {
                value: email,
                type: 'ascii'
            }
        };
        validateFields(fieldsToBeValidated);

        await QuestionsService.add(question, email);
        res.status(201).end();
    } catch (err) {
        next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('tehnic', 'user'), async (req, res, next) => {
    try {
        const questions = await QuestionsService.getAll();
        res.json(questions);
    } catch (err) {
        next(err);
    }
});

router.put('/response/:id', authorizeAndExtractToken, authorizeRoles('tehnic'), async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        response
    } = req.body;
    try {
        const fieldsToBeValidated = {
            id: {
                value: id,
                type: 'ascii'
            },
            response: {
                value: response,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        const question = await QuestionsService.updateResponse(id, response);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: question.email,
            subject: "Response for your question",
            html: "Hello,<br> Thank you for your <b> question: </b> " + question.question + "<br> Our <b> response: </b> is: " + question.response
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("ERROR occured!");
            } else {
                console.log("Mail sent!");
                res.end("Mail sent!");
            }
        });

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.get('/updateImportance/:id', authorizeAndExtractToken, authorizeRoles('tehnic'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const fieldsToBeValidated = {
            id: {
                value: id,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await QuestionsService.updateImportance(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });
        
        await QuestionsService.deleteById(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;