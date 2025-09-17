const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM Productos');
    return rows;
};

exports.findById = async (idProductos) => {
    const [rows] = await db.execute('SELECT * FROM Productos WHERE idProductos = ?', [idProductos]);
    return rows[0];
};

exports.create = async (newProductos) => {
    const [result] = await db.execute(
        'INSERT INTO Productos (juguetes, accesorios) VALUES (?, ?)',
        [newProductos.juguetes, newProductos.accesorios]
    );
    return { id: result.insertId, ...newProductos };
};

exports.update = async (idProductos, updatedProductos) => {
    const [result] = await db.execute(
        'UPDATE Productos SET juguetes = ?, accesorios = ? WHERE idProductos = ?',
        [updatedProductos.juguetes, updatedProductos.accesorios, idProductos]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idProductos) => {
    const [result] = await db.execute('DELETE FROM Productos WHERE idProductos = ?', [idProductos]);
    return result.affectedRows > 0;
};