const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM categorias');
    return rows;
};

exports.findById = async (id_categoria) => {
    const [rows] = await db.execute('SELECT * FROM categorias WHERE id_categoria = ?', [id_categoria]);
    return rows[0];
};

exports.create = async (newCategoria) => {
    const [result] = await db.execute(
        'INSERT INTO categorias (nombre_categoria) VALUES (?)',
        [newCategoria.nombre_categoria]
    );
    return { id_categoria: result.insertId, ...newCategoria };
};

exports.update = async (id_categoria, updatedCategoria) => {
    const [result] = await db.execute(
        'UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?',
        [updatedCategoria.nombre_categoria, id_categoria]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_categoria) => {
    const [result] = await db.execute('DELETE FROM categorias WHERE id_categoria = ?', [id_categoria]);
    return result.affectedRows > 0;
};