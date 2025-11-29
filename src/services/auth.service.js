const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('./email.service'); 

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura'; 

exports.register = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        const [result] = await db.execute(
            'INSERT INTO clientes (nombre, apellido, email, contraseña, direccion, telefono, is_verified, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                name,
                null, 
                email,
                hashedPassword,
                null, 
                null, 
                false, 
                verificationToken
            ]
        );

        const newClientId = result.insertId;

        await emailService.sendVerificationEmail(email, verificationToken);

        return { 
            id_cliente: newClientId, 
            message: 'Registro exitoso. Revisa tu correo electrónico para verificar tu cuenta.' 
        };
    } catch (error) {
        throw error;
    }
};

exports.login = async (email, password) => {
    const [rows] = await db.execute('SELECT * FROM clientes WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
        throw new Error('Email o contraseña inválidos.');
    }

    if (!user.is_verified) {
        throw new Error('Tu cuenta no ha sido verificada. Revisa tu correo.');
    }

    const isMatch = await bcrypt.compare(password, user.contraseña);

    if (!isMatch) {
        throw new Error('Email o contraseña inválidos.');
    }

    const token = jwt.sign(
        { id: user.id_cliente, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    
    delete user.contraseña; 

    return { token, user };
};

exports.verifyEmail = async (token) => {
    const [rows] = await db.execute(
        'SELECT id_cliente FROM clientes WHERE verification_token = ?',
        [token]
    );

    if (rows.length === 0) {
        throw new Error('Token inválido o cuenta ya verificada.');
    }

    const id_cliente = rows[0].id_cliente;

    await db.execute(
        'UPDATE clientes SET is_verified = TRUE, verification_token = NULL WHERE id_cliente = ?',
        [id_cliente]
    );

    return { message: 'Cuenta verificada exitosamente.' };
};