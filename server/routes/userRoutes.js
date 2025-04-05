const express = require('express');
const { createUser, getUser, updateUser } = require('../controllers/userController');

const router = express.Router();

// User routes
router.post('/', createUser);
router.get('/:clerkId', getUser);
router.patch('/:clerkId', updateUser);

module.exports = router; 