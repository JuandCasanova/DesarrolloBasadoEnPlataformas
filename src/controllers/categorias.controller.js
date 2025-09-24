const categoriaService = require('../services/categoria.service');

exports.findAll = async (req, res) => {
    try {
        const categorias = await categoriaService.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener categorias", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const categoria = await categoriaService.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la categoria", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newCategoria = await categoriaService.create(req.body);
        res.status(201).json(newCategoria);
    } catch (error) {
        res.status(500).json({ message: "Error al crear categoria", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await categoriaService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        res.status(200).json({ message: "Categoria actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar categoria", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await categoriaService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        res.status(200).json({ message: "Categoria eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar categoria", error });
    }
};