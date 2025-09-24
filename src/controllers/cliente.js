const clienteService = require('../services/cliente.service');

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