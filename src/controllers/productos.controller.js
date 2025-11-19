const productoService = require('../services/productos.service');

exports.findAll = async (req, res) => {
    try {
        const productos = await productoService.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const producto = await productoService.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};

exports.create = async (req, res) => {
    try {
        const nuevoProducto = await productoService.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error detallado al crear producto:", error);
        res.status(500).json({ 
            message: "Error al crear producto", error });
            detalle: error.message || 'Error desconocido'
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await productoService.update(req.params.id, req.body);
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
        const removed = await productoService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        res.status(200).json({ message: "producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};