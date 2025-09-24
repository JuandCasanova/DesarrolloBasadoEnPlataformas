const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');

router.get('/', pedidosController.findAll);
router.get('/:id', pedidosController.findById);
router.post('/', pedidosController.create);
router.put('/:id', pedidosController.update);
router.delete('/:id', pedidosController.remove);

module.exports = router;