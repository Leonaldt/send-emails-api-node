const sendgridMail = require('@sendgrid/mail')
const fs = require("fs")

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

pathToAttachment = `${__dirname}/signature-reszon.jpeg`;
attachment = fs.readFileSync(pathToAttachment).toString('base64');

const sendWelcomeEmail = (name, email, password) => {
    sendgridMail.send({
        from: `Reszon <${process.env.EMAIL}>`,
        to: email,
        subject: 'Bem-vindo ao Reszon',
        html: `<h2>Olá, ${name}!</h2>
               <p>Esta é a sua senha de acesso: <b>${password}</b>.</p>
               <p>Você pode alterar a hora que quiser, basta ir na opção <a href="https://reszon.com.br/login/identify">Esqueci minha senha</a> disponível na sua conta.</p>
               <p>Nós do Reszon agradecemos a confiança!</p>
               <hr>
               <img style="width: 300px;" src='cid:signature' alt='Reszon'/>`,
        attachments: [{
            filename: 'logo.jpeg',
            type: 'image/jpeg',
            content: attachment,
            content_id: 'signature',
            disposition: 'inline'
        }]
    })
}

const sendContactUsEmail = (name, email, message) => {
    sendgridMail.send({
        to: process.env.EMAIL,
        from: process.env.EMAIL, email,
        subject: 'Formulário de Contato',
        text: `Mensagem de ${name} <${email}>.\n${message}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendContactUsEmail
}