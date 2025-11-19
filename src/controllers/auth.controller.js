// src/controllers/auth.controller.js

const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    // CRÍTICO: Extraer los campos individualmente y con el nombre correcto (name)
    const { name, email, password } = req.body;

    // Log para confirmar que los datos llegan al controlador
    console.log("-> RECIBIDA PETICIÓN DE REGISTRO. Datos:", { name, email, password });
    
    try {
        // Pasar los campos individuales al servicio
        const result = await authService.register(name, email, password);
        
        // 201 Created
        res.status(201).json(result); 
    } catch (error) {
        // Manejar errores de DB (email duplicado) o de envío de correo
        console.error("Error en registro:", error);
        
        // Asignación de status code según el tipo de error
        let status = 500;
        if (error.message && error.message.includes('Duplicate entry')) {
            status = 409; // Conflicto: Email ya existe
        } else if (error.message && error.message.includes('inválido')) {
            status = 400; // Bad Request
        }
        
        res.status(status).json({ message: error.message || 'Error al registrar usuario.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result); 
    } catch (error) {
        // Manejar errores de credenciales inválidas o no verificadas
        const status = error.message.includes('inválidos') || error.message.includes('verificada') ? 401 : 500;
        res.status(status).json({ message: error.message || 'Error al iniciar sesión.' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        await authService.verifyEmail(token);
        
        // Respuesta de éxito para el usuario que hace clic en el link
        res.send('Cuenta verificada exitosamente. Puedes cerrar esta ventana e iniciar sesión.'); 
    } catch (error) {
        console.error("Error en verificación:", error);
        const status = error.message.includes('inválido') ? 400 : 500;
        res.status(status).send(error.message || 'Error en el proceso de verificación.');
    }
};