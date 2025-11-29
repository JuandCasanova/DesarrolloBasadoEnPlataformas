const db = require('../config/db.config');

const getValidCategoriaId = (categoriaValue) => {
    const id = parseInt(categoriaValue, 10);
    if (isNaN(id) || id <= 0) {
        return 1; 
    }
    return id;
};

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM Productos');
    return rows;
};

exports.findById = async (id_producto) => {
    const [rows] = await db.execute('SELECT * FROM Productos WHERE id_producto = ?', [id_producto]);
    return rows[0];
};

exports.create = async (newProductos) => {
    const nombre = newProductos.nombre ?? null; 
    const descripcion = newProductos.descripcion ?? null;
    
    const idCategoria = getValidCategoriaId(newProductos.categoria); 

    try {
        const [result] = await db.execute(
            'INSERT INTO Productos (nombre, descripcion, precio, stock, id_categoria) VALUES (?, ?, ?, ?, ?)',
            [
                nombre, 
                descripcion, 
                newProductos.precio, 
                newProductos.stock, 
                idCategoria 
            ]
        );
        return { 
            id: result.insertId, 
            nombre: nombre,
            descripcion: descripcion,
            precio: newProductos.precio,
            stock: newProductos.stock,
            categoria: idCategoria 
        };
    } catch (error) {
        console.error("Error detallado en productos.service.js (create):", error);
        throw error; 
    }
};

exports.update = async (id_producto, updatedProductos) => {
    const nombre = updatedProductos.nombre ?? null; 
    const descripcion = updatedProductos.descripcion ?? null;
    
    const idCategoria = getValidCategoriaId(updatedProductos.categoria);

    try {
        const [result] = await db.execute(
            'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ? WHERE id_producto = ?',
            [
                nombre, 
                descripcion, 
                updatedProductos.precio, 
                updatedProductos.stock, 
                idCategoria,
                id_producto
            ]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error detallado en productos.service.js (update):", error);
        throw error;
    }
};

exports.remove = async (id_producto) => {
    const [result] = await db.execute('DELETE FROM Productos WHERE id_producto = ?', [id_producto]);
    return result.affectedRows > 0;
};