const clienteService = require('../services/cliente.service');

exports.getProfile = async (req, res) => {
    const userId = req.user.id; 
    
    try {
        const user = await clienteService.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }
        
        const profileData = {
            id: user.id_cliente || user.id,
            name: user.nombre ||user.name || 'cliente', 
            email: user.email 
        };
        
        return res.status(200).json(profileData);
    } catch (error) {
        console.error('Error al obtener perfil del cliente:', error);
        return res.status(500).json({ message: 'Error interno del servidor al cargar el perfil.' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const clientes = await clienteService.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const cliente = await clienteService.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newCliente = await clienteService.create(req.body);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ message: "Error al crear cliente", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await clienteService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar cliente", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await clienteService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar cliente", error });
    }
};
exports.verifyAccount = async (req, res) => {
    const { token } = req.query; 

    if (!token) {
        return res.status(400).send('Token de verificación faltante.');
    }

    try {
        const [rows] = await db.execute(
            'SELECT id_cliente FROM clientes WHERE verification_token = ?',
            [token]
        );

        if (rows.length === 0) {
            return res.status(404).send('Token inválido o cuenta ya verificada.');
        }

        const id_cliente = rows[0].id_cliente;

        await db.execute(
            'UPDATE clientes SET is_verified = TRUE, verification_token = NULL WHERE id_cliente = ?',
            [id_cliente]
        );

        res.send('¡Cuenta verificada exitosamente! Ya puedes iniciar sesión.');

    } catch (error) {
        console.error('Error durante la verificación:', error);
        res.status(500).send('Error interno del servidor.');
    }
};

