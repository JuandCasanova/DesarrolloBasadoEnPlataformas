const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM home');
    return rows;
};

exports.findById = async (idhome) => {
    const [rows] = await db.execute('SELECT * FROM home WHERE idhome = ?', [idhome]);
    return rows[0];
};

exports.create = async (newhome) => {
    const [result] = await db.execute(
        'INSERT INTO home (conocenos, productos, contactanos) VALUES (?, ?, ?)',
        [newhome.conocenos, newhome.productos, newhome.contactanos]
    );
    return { idhome: result.insertId, ...newhome };
};

exports.update = async (idhome, updatedhome) => {
    const [result] = await db.execute(
        'UPDATE home SET conocenos = ?, productos = ?, contactanos = ?, WHERE idhome = ?',
        [updatedhome.conocenos, updatedhome.productos, updatedhome.contactanos, idhome]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id) => {
    const [result] = await db.execute('DELETE FROM home WHERE idhome = ?', [idhome]);
    return result.affectedRows > 0;
};