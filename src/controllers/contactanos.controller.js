const contactanosService = require('../services/contactanos.service');

exports.findAll = async (req, res) => {
    try {
        const contactos = await contactanosService.findAll();
        res.status(200).json(contactos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener contacto", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const contacto = await contactanosService.findById(req.params.id);
        if (!contacto) {
            return res.status(404).json({ message: "contacto no encontrado" });
        }
        res.status(200).json(contacto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el contacto", error });
    }
};

exports.create = async (req, res) => {
    try {
        const nuevoContacto = await contactanosService.create(req.body);
        res.status(201).json(nuevoContacto);
    } catch (error) {
        res.status(500).json({ message: "Error al crear contacto", error });
    }
};

exports.update = async (req, res) => {
    try {
        // Se recomienda que el servicio devuelva el objeto actualizado,
        // pero se mantiene la lógica de mensaje por coherencia con el original.
        const updated = await contactanosService.update(req.params.id, req.body);
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
        const removed = await contactanosService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Contacto no encontrado" });
        }
        res.status(200).json({ message: "Contacto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar contacto", error });
    }
};