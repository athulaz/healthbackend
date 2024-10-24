// models/Patient.js

const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  treatments: {
    type: [String], // Array of treatments
    required: true,
  },
  medicalHistory: {
    type: [String], // Array of strings (e.g., ["Hypertension", "Diabetes"])
    required: true,
  },
  labResults: {
    type: [String], // Array of lab result strings (e.g., ["Blood Sugar: 120 mg/dL"])
    required: true,
  },
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
