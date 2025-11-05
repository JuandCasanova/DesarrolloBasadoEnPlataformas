const homeService = require('../services/home.service');

exports.findAll = async (req, res) => {
    try {
        const homeItems = await homeService.findAll();
        res.status(200).json(homeItems);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener home", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const itemHome = await homeService.findById(req.params.id);
        if (!itemHome) {
            return res.status(404).json({ message: "home no encontrado" });
        }
        res.status(200).json(itemHome);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el home", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newItemHome = await homeService.create(req.body);
        res.status(201).json(newItemHome);
    } catch (error) {
        res.status(500).json({ message: "Error al crear home", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await homeService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "home no encontrado" });
        }
        res.status(200).json({ message: "home actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar home", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await homeService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "home no encontrado" });
        }
        res.status(200).json({ message: "home eliminado exitosamente" });
    } catch (error) {
        // Corregido el mensaje de error de 'home al eliminar usuario'
        res.status(500).json({ message: "Error al eliminar home", error }); 
    }
};