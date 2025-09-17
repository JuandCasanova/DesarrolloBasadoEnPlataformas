const userService = require('../services/productos.service');

exports.findAll = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newUser = await userService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await userService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        res.status(200).json({ message: "producto actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await userService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        res.status(200).json({ message: "producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};