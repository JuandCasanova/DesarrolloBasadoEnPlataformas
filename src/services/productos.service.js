const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM Productos');
    return rows;
};

exports.findById = async (id_producto) => {
    const [rows] = await db.execute('SELECT * FROM Productos WHERE id_producto = ?', [id_producto]);
    return rows[0];
};

exports.create = async (newProductos) => {
    const [result] = await db.execute(
        // ÚLTIMO INTENTO: Volvemos a 'id_categoria' (minúsculas) como fue creada en el script de Python
        'INSERT INTO Productos (nombre_producto, descripcion, precio, stock, id_categoria) VALUES (?, ?, ?, ?, ?)',
        [
            newProductos.nombre_producto, 
            newProductos.descripcion, 
            newProductos.precio, 
            newProductos.stock, 
            newProductos.id_categoria
        ]
    );
    return { id_producto: result.insertId, ...newProductos };
};

exports.update = async (id_producto, updatedProductos) => {
    const [result] = await db.execute(
        // Estandarizado a 'id_categoria' (minúsculas)
        'UPDATE Productos SET nombre_producto = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ? WHERE id_producto = ?',
        [
            updatedProductos.nombre_producto, 
            updatedProductos.descripcion, 
            updatedProductos.precio, 
            updatedProductos.stock, 
            updatedProductos.id_categoria,
            id_producto
        ]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_producto) => {
    const [result] = await db.execute('DELETE FROM Productos WHERE id_producto = ?', [id_producto]);
    return result.affectedRows > 0;
};