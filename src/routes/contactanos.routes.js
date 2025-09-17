
const express = require('express');
const router = express.Router();
const contactanosController = require('../controllers/contactanos.controller');

router.get('/', contactanosController.findAll);
router.get('/:id', contactanosController.findById);
router.post('/', contactanosController.create);
router.put('/:id', contactanosController.update);
router.delete('/:id', contactanosController.remove);

module.exports = router;