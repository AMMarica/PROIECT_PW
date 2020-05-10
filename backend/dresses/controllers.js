const express = require('express');
const nodemailer = require("nodemailer");

const DressesService = require('./services.js');
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

router.post('/', async (req, res, next) => {
    const {
        image,
        title,
        description,
        price
    } = req.body;

    try {
        const fieldsToBeValidated = {
            image: {
                value: image,
                type: 'ascii'
            },
            title: {
                value: title,
                type: 'ascii'
            },
            description: {
                value: description,
                type: 'ascii'
            },
            price: {
                value: price,
                type: 'ascii'
            }
        };
        validateFields(fieldsToBeValidated);

        await DressesService.add(image, title, description, price);
        res.status(201).end();
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const dresses = await DressesService.getAll();
        res.json(dresses);
    } catch (err) {
        next(err);
    }
});

router.get('/updateSelected/:id', authorizeAndExtractToken, authorizeRoles('user'), async (req, res, next) => {
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

        await DressesService.updateSelected(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
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
        
        await DressesService.deleteById(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;