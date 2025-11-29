const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_SERVICE_USER, 
        pass: process.env.EMAIL_SERVICE_PASSWORD
    }
});

exports.sendVerificationEmail = async (toEmail, token) => {
    const verificationUrl = `http://localhost:3000/api/auth/verify-email?token=${token}`; 

    const mailOptions = {
        from: process.env.EMAIL_SERVICE_USER,
        to: toEmail,
        subject: 'Verificación de Cuenta para TiendaOnline',
        html: `
            <h1>¡Bienvenido!</h1>
            <p>Gracias por registrarte. Por favor, haz clic en el siguiente enlace para verificar tu correo:</p>
            <a href="${verificationUrl}">Verificar Mi Cuenta</a>
            <p>Si el enlace no funciona, cópialo y pégalo en tu navegador: ${verificationUrl}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo de verificación enviado a: ${toEmail}`);
        return true;
    } catch (error) {
        console.error('ERROR AL ENVIAR CORREO:', error);
        throw new Error('Fallo al enviar el correo de verificación.');
    }
};