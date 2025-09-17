
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

router.get('/', homeController.findAll);
router.get('/:id', homeController.findById);
router.post('/', homeController.create);
router.put('/:id', homeController.update);
router.delete('/:id', homeController.remove);

module.exports = router;