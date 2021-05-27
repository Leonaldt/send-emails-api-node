const sendgridMail = require('@sendgrid/mail')

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (fullname, email, password) => {
    sendgridMail.send({
        to: email,
        from: process.env.EMAIL,
        subject: 'Bem vindo ao Reszon!',
        text: `Olá, ${fullname}.\nEsta é a sua senha de acesso: ${password}.`
    })
}

module.exports = {
    sendWelcomeEmail
}