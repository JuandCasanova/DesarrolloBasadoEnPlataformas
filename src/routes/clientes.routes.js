const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/perfil', authMiddleware.verifyToken, clientesController.getProfile); 

router.get('/verify', clientesController.verifyAccount);
router.get('/', clientesController.findAll);
router.get('/:id', clientesController.findById);
router.post('/', clientesController.create);
router.put('/:id', clientesController.update);
router.delete('/:id', clientesController.remove);


module.exports = router;