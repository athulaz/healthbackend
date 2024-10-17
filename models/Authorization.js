// models/Authorization.js

const mongoose = require('mongoose');

const AuthorizationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  treatmentType: {
    type: String,
    required: true,
  },
  insurancePlan: {
    type: String,
    required: true,
  },
  
  diagnosisCode: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Authorization = mongoose.model('Authorization', AuthorizationSchema);

module.exports = Authorization;
