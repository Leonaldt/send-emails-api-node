const sendgridMail = require('@sendgrid/mail')

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (name, email, password) => {
    sendgridMail.send({
        to: email,
        from: process.env.EMAIL,
        subject: 'Bem vindo ao Reszon!',
        text: 'Reszon',
        html: `<p>Olá, ${name}!</p>
               <p>Esta é a sua senha de acesso: <b>${password}.</b></p>
               <p>Você pode alterar a hora que quiser, basta ir na opção <a href="#">alterar senha</a> disponível na sua conta.</p>
               <p>Nós do Reszon agradecemos a confiança!</p>`
    })
}

const sendContactUsEmail = (name, email, message) => {
    sendgridMail.send({
        to: process.env.EMAIL,
        from: email,
        subject: 'Formulário de Contato',
        text: `Mensagem de ${name}.\n${message}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendContactUsEmail
}