// src/middleware/auth.middleware.js

const jwt = require('jsonwebtoken');

// Usar la misma clave secreta que en auth.service.js
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura';

exports.verifyToken = (req, res, next) => {
    // 1. Obtener el encabezado de autorización
    const authHeader = req.headers.authorization;

    // 2. Comprobar que existe y tiene formato 'Bearer [token]'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // 3. Extraer el token (quitar "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // 4. Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 5. Adjuntar los datos decodificados (id y email) a la solicitud
        // req.user.id será el id_cliente que creaste al registrarte
        req.user = decoded; 
        
        // 6. Pasar al controlador
        next();
    } catch (err) {
        // Token inválido o expirado
        return res.status(403).json({ message: 'Token inválido o expirado. Vuelve a iniciar sesión.' });
    }
};