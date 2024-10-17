// controllers/authorizationController.js

const Authorization = require('../models/Authorization');

// Get all authorizations
exports.getAllAuthorizations = async (req, res) => {
  try {
    const authorizations = await Authorization.find().populate('patientId');
    res.json(authorizations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Get a single authorization by ID
exports.getAuthorizationById = async (req, res) => {
  try {
    const authorization = await Authorization.findById(req.params.id);
    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }
    res.json(authorization);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Create a new authorization
exports.createAuthorization = async (req, res) => {
  const { patientId, treatmentType, insurancePlan, diagnosisCode, notes } = req.body;

  try {
    const newAuthorization = new Authorization({
      patientId,
      treatmentType,
      insurancePlan,
      diagnosisCode,
      notes,
      status: 'pending',
    });

    const authorization = await newAuthorization.save();
    res.status(201).json(authorization);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Update authorization status
exports.updateAuthorizationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const authorization = await Authorization.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }

    res.json(authorization);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Delete an authorization
exports.deleteAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.findByIdAndDelete(req.params.id);

    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }

    res.json({ message: 'Authorization removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


exports.submitAuthorization = async (req, res) => {
  const { treatmentType, insurancePlan, dateOfService, diagnosisCode, notes, patientId } = req.body;
  try {
    const authorization = new Authorization({
      treatmentType,
      insurancePlan,
      dateOfService: parsedDate, 
      diagnosisCode,
      notes,
      patientId,
      status: 'Pending',
    });
    await authorization.save();
    res.status(201).json({ message: 'Authorization request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit authorization request' });
  }
};



// Controller to list all authorization requests
exports.getAuthorizations = async (req, res) => {
  try {
    // Fetch all authorization requests and populate the patient details
    const authorizations = await Authorization.find().populate('patientId');
    res.status(200).json(authorizations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authorization requests' });
  }
};

// Controller to update the status of an authorization request
exports.updateAuthorizationStatus = async (req, res) => {
    const { authorizationId, status } = req.body;
    try {
      const authorization = await Authorization.findById(authorizationId);
      if (!authorization) {
        return res.status(404).json({ message: 'Authorization request not found' });
      }
  
      authorization.status = status;
      await authorization.save();
  
      res.status(200).json({ message: `Authorization request ${status}` });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update authorization status' });
    }
  };
  

