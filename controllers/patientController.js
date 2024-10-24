// controllers/patientController.js

const Patient = require('../models/Patient');

// controllers/patientController.js

exports.getAllPatients = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;  // Get the page number from query params, default to 1
      const limit = parseInt(req.query.limit) || 10;  // Get the limit from query params, default to 10
      const skip = (page - 1) * limit;  // Calculate how many documents to skip
  
      // Fetch patients with pagination
      const patients = await Patient.find().skip(skip).limit(limit);
      const totalPatients = await Patient.countDocuments();  // Get the total number of patients
      const totalPages = Math.ceil(totalPatients / limit);  // Calculate total pages
  
      res.json({
        patients,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).send('Server error');
    }
  };
  

// Get a single patient by ID


exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);  // Find patient by ID
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);  // Return the patient data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient details' });
  }
};


// Create a new patient
exports.createPatient = async (req, res) => {
  const { name, age, condition, medicalHistory, labResults } = req.body;

  try {
    const newPatient = new Patient({
      name,
      age,
      condition,
      medicalHistory,
      labResults,
    });

    const patient = await newPatient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Update a patient
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};