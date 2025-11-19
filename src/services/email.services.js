// src/services/email.service.js

const nodemailer = require('nodemailer');

// 1. Configurar el transportador (usando las variables de entorno)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes cambiarlo a 'hotmail', 'outlook', etc.
    auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASSWORD
    }
});

/**
 * Función para enviar el correo de verificación.
 * @param {string} toEmail - El correo del usuario registrado.
 * @param {string} token - El token único de verificación.
 */
exports.sendVerificationEmail = async (toEmail, token) => {
    const verificationUrl = `http://localhost:3000/api/auth/verify?token=${token}`; // URL de tu backend

    const mailOptions = {
        from: process.env.EMAIL_SERVICE_USER,
        to: toEmail,
        subject: 'Verificación de Cuenta para TiendaOnline',
        html: `
            <h1>Bienvenido a TiendaOnline</h1>
            <p>Gracias por registrarte. Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
            <p>Si no te registraste, por favor, ignora este correo.</p>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo de verificación enviado: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return false;
    }
};