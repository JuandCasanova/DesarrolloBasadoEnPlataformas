const pedidoService = require('../services/pedido.service');

exports.findAll = async (req, res) => {
    try {
        const pedidos = await pedidoService.findAll();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pedidos", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const pedido = await pedidoService.findById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el pedido", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newPedido = await pedidoService.create(req.body);
        res.status(201).json(newPedido);
    } catch (error) {
        res.status(500).json({ message: "Error al crear pedido", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await pedidoService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.status(200).json({ message: "Pedido actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar pedido", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await pedidoService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.status(200).json({ message: "Pedido eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar pedido", error });
    }
};