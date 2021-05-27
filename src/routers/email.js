const express = require('express')
const { check } = require('express-validator');
const { validate } = require('./validate')
const { sendWelcomeEmail, sendContactUsEmail } = require('../emails/account')

const router = new express.Router()

router.post('/send-welcome-email', validate([
    check('name', 'Nome completo é obrigatório').notEmpty(),
    check('email', 'Email não é válido').isEmail(),
    check('password', 'Senha é obrigatória').notEmpty()
]), (req, res) => {
    const user = req.body

    try {
        sendWelcomeEmail(user.name, user.email, user.password)
        res.status(204).send()
    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
})

router.post('/send-contactus-email', validate([
    check('name', 'Nome é obrigatório').notEmpty(),
    check('email', 'Email não é válido').isEmail(),
    check('message', 'Mensagem é obrigatória').notEmpty(),
]), (req, res) => {
    const user = req.body

    try {
        sendContactUsEmail(user.name, user.email, user.message)
        res.status(204).send()
    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
})

module.exports = router