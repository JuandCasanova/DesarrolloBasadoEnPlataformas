const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM Contactanos');
    return rows;
};

exports.findById = async (idContactanos) => {
    const [rows] = await db.execute('SELECT * FROM Contactanos WHERE idContactanos = ?', [idContactanos]);
    return rows[0];
};

exports.create = async (newContactanos) => {
    const [result] = await db.execute(
        'INSERT INTO Contactanos (telefono, correo) VALUES (?, ?)',
        [newContactanos.telefono, newContactanos.correo]
    );
    return { idContactanos: result.insertId, ...newContactanos };
};

exports.update = async (idContactanos, updatedContactanos) => {
    const [result] = await db.execute(
        'UPDATE user SET nombre = ?, correo = ? WHERE idContactanos = ?',
        [updatedUser.nombre, updatedContactanos.correo, idContactanos]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idContactanos) => {
    const [result] = await db.execute('DELETE FROM Contactanos WHERE idContactanos = ?', [idContactanos]);
    return result.affectedRows > 0;
};