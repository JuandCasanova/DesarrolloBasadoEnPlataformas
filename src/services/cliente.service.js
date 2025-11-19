const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM clientes');
    return rows;
};

exports.findById = async (id_cliente) => {
    const [rows] = await db.execute('SELECT * FROM clientes WHERE id_cliente = ?', [id_cliente]);
    return rows[0];
};

exports.create = async (newCliente) => {
    const hashedPassword = bcrypts.hash(newCliente.contraseña,10);
    const token = crypto.randomBytes(32).toString('hex');
    const [result] = await db.execute(
        'INSERT INTO clientes (nombre, apellido, email, contraseña, direccion, telefono, is_verified, verification_token) VALUES (?, ? , ?, ?, ?, ?, ?, ?)',
        [
            newCliente.nombre, 
            newCliente.apellido, 
            newCliente.email, 
            hashedPassword, 
            newCliente.direccion, 
            newCliente.telefono,
            false,
            token
        ]
    );
    await emailService.sendVerificationEmail(newCliente.email, token);
    return { id_cliente: result.insertId, ...newCliente };
};

exports.update = async (id_cliente, updatedCliente) => {
    const [result] = await db.execute(
        'UPDATE clientes SET nombre = ?, apellido = ?, email = ?, contraseña = ?, direccion = ?, telefono = ? WHERE id_cliente = ?',
        [updatedCliente.nombre, updatedCliente.apellido, updatedCliente.email, updatedCliente.contraseña, updatedCliente.direccion, updatedCliente.telefono, id_cliente]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_cliente) => {
    const [result] = await db.execute('DELETE FROM clientes WHERE id_cliente = ?', [id_cliente]);
    return result.affectedRows > 0;
};