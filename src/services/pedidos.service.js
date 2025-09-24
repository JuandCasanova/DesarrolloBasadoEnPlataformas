const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM pedidos');
    return rows;
};

exports.findById = async (id_pedido) => {
    const [rows] = await db.execute('SELECT * FROM pedidos WHERE id_pedido = ?', [id_pedido]);
    return rows[0];
};

exports.create = async (newPedido) => {
    const [result] = await db.execute(
        'INSERT INTO pedidos (fecha_pedido, estado, total, id_cliente) VALUES (?, ?, ?, ?)',
        [newPedido.fecha_pedido, newPedido.estado, newPedido.total, newPedido.id_cliente]
    );
    return { id_pedido: result.insertId, ...newPedido };
};

exports.update = async (id_pedido, updatedPedido) => {
    const [result] = await db.execute(
        'UPDATE pedidos SET fecha_pedido = ?, estado = ?, total = ?, id_cliente = ? WHERE id_pedido = ?',
        [updatedPedido.fecha_pedido, updatedPedido.estado, updatedPedido.total, updatedPedido.id_cliente, id_pedido]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id_pedido) => {
    const [result] = await db.execute('DELETE FROM pedidos WHERE id_pedido = ?', [id_pedido]);
    return result.affectedRows > 0;
};