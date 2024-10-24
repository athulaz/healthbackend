// routes/authorizationRoutes.js

const express = require('express');
const { getAllAuthorizations, getAuthorizationById, createAuthorization, updateAuthorizationStatus, deleteAuthorization, getAuthorizations, submitAuthorization } = require('../controllers/authorizationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Get all authorizations
router.get('/', authMiddleware, getAllAuthorizations);

// Get a single authorization by ID
router.get('/:id', authMiddleware, getAuthorizationById);

// Create a new authorization request
router.post('/', authMiddleware, createAuthorization);

// Update authorization status (approved, denied, etc.)
router.put('/:id', authMiddleware, updateAuthorizationStatus);

// Delete an authorization request
router.delete('/:id', authMiddleware, deleteAuthorization);

// Route to get all authorization requests
router.get('/', authMiddleware, getAuthorizations);

// Route to submit an authorization request (already done)
router.post('/', authMiddleware, submitAuthorization);






module.exports = router;


