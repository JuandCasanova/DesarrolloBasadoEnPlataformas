const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM home');
    return rows;
};

exports.findById = async (id_home) => {
    const [rows] = await db.execute('SELECT * FROM home WHERE id_home = ?', [id_home]);
    return rows[0];
};

exports.create = async (newhome) => {
    const [result] = await db.execute(
        'INSERT INTO home (titulo, contenido) VALUES (?, ?)',
        [newhome.titulo, newhome.contenido]
    );
    return { id_home: result.insertId, ...newhome };
};

exports.update = async (id_home, updatedhome) => {
    const [result] = await db.execute(
        'UPDATE home SET titulo = ?, contenido = ? WHERE id_home = ?',
        [updatedhome.titulo, updatedhome.contenido, id_home]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_home) => {
    const [result] = await db.execute('DELETE FROM home WHERE id_home = ?', [id_home]);
    return result.affectedRows > 0;
};