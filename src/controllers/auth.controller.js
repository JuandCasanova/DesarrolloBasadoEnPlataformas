const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("-> RECIBIDA PETICIÓN DE REGISTRO. Datos:", { name, email, password });
    
    try {
        const result = await authService.register(name, email, password);
        
        res.status(201).json(result); 
    } catch (error) {
        console.error("Error en registro:", error);  
        let status = 500;
        if (error.message && error.message.includes('Duplicate entry')) {
            status = 409;
        } else if (error.message && error.message.includes('inválido')) {
            status = 400;
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
        const status = error.message.includes('inválidos') || error.message.includes('verificada') ? 401 : 500;
        res.status(status).json({ message: error.message || 'Error al iniciar sesión.' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        await authService.verifyEmail(token);
        
        res.send('Cuenta verificada exitosamente. Puedes cerrar esta ventana e iniciar sesión.'); 
    } catch (error) {
        console.error("Error en verificación:", error);
        const status = error.message.includes('inválido') ? 400 : 500;
        res.status(status).send(error.message || 'Error en el proceso de verificación.');
    }
};