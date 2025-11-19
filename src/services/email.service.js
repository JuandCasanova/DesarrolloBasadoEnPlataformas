const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambia si usas otro proveedor (ej: 'Outlook', 'SendGrid')
    auth: {
        user: process.env.EMAIL_SERVICE_USER, // Tu correo (ej: tu_correo@gmail.com)
        pass: process.env.EMAIL_SERVICE_PASSWORD // Tu contraseña de aplicación/token
    }
});

exports.sendVerificationEmail = async (toEmail, token) => {
    // Esta URL debe coincidir con la que está en tu auth.routes.js: /api/auth/verify-email
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
        // Es crucial lanzar el error para que el proceso de registro falle si el correo no se puede enviar
        throw new Error('Fallo al enviar el correo de verificación.');
    }
};