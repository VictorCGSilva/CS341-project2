const express = require('express');
const router = require('express').Router();
const controller = require('../controllers/computers');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');    
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/',isAuthenticated, controller.createCons);
router.put('/:id',isAuthenticated, controller.updateCons);
router.delete('/:id',isAuthenticated, controller.deleteCons);

module.exports = router;