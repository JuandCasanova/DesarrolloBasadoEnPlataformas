const userService = require('../services/contactanos.service');

exports.findAll = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener contacto", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "contacto no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el contacto", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newUser = await userService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear contacto", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await userService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "contacto no encontrado" });
        }
        res.status(200).json({ message: "contacto actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar contacto", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await userService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Contacto no encontrado" });
        }
        res.status(200).json({ message: "Contacto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar contacto", error });
    }
};