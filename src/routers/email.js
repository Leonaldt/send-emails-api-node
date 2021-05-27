const express = require('express')
const { sendWelcomeEmail } = require('../emails/account')
const { check, validationResult } = require('express-validator');

const router = new express.Router()

router.post('/send-welcome-email', [
    check('fullname', 'Nome completo é obrigatório').notEmpty() ,
    check('email', 'Email não é válido').isEmail(),
    check('password', 'Senha precisar ter no mínimo 6 caracteres').isLength({ min: 5 })
], async (req, res) => {
    const user = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        sendWelcomeEmail(user.fullname, user.email, user.password)
        res.status(204).send({ user })
    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
})

module.exports = router