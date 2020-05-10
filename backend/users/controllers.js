const express = require('express');
const nodemailer = require("nodemailer");

const UsersService = require('./services.js');
const {
    validateFields
} = require('../utils');

const router = express.Router();

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/register', async (req, res, next) => {
    const {
        username,
        password,
        name,
        email
    } = req.body;

    try {
        const fieldsToBeValidated = {
            username: {
                value: username,
                type: 'alpha'
            },
            password: {
                value: password,
                type: 'ascii'
            },
            name: {
                value: name,
                type: 'ascii'
            },
            email: {
                value: email,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);
        const user_id = await UsersService.addUser(username, password, name, email);

        link = "http://" + req.get('host') + "/users/confirmation/" + user_id;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email account confirmation",
            html: "Hello,<br> Please Click on the link to verify your email address.<br><a href=" + link + ">Click here to verify</a>"
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

        res.status(201).send('Confirm your email address before trying to logIn!');

        res.status(201).send("Register");
    } catch (err) {
        next(err);
    }
});

router.get('/confirmation/:id', async (req, res, next) => {
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

        await UsersService.confirmUser(id);
        res.status(200).send("Your Email address is now confirmed!");
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
  const {
      username,
      password
  } = req.body;

  try {
    const fieldsToBeValidated = {
        username: {
            value: username,
            type: 'ascii'
        },
        password: {
            value: password,
            type: 'ascii'
        }
    };

    validateFields(fieldsToBeValidated);

    const token = await UsersService.authenticate(username, password);

    res.status(200).json(token);
} catch (err) {
    next(err);
}

})

router.get('/', async (req, res, next) => {
    res.json(await UsersService.getUsers());
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

        await UsersService.deleteById(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;