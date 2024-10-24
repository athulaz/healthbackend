// routes/patientRoutes.js

const express = require('express');
const { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Get all patients
router.get('/', authMiddleware, getAllPatients);

// Get a single patient by ID
router.get('/:id', authMiddleware, getPatientById);

// Create a new patient
router.post('/', authMiddleware, createPatient);

// Update a patient
router.put('/:id', authMiddleware, updatePatient);

// Delete a patient
router.delete('/:id', authMiddleware, deletePatient);

module.exports = router;