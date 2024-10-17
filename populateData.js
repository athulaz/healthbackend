// populateData.js
const mongoose = require('mongoose');
const Patient = require('./models/Patient');  // Adjust the path to your models
const Authorization = require('./models/Authorization');
require('dotenv').config(); // Ensure your .env file has the correct MongoDB URI

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Insert patients
const insertPatients = async () => {
  const patients = [
    {
      name: 'John Doe',
      age: 45,
      condition: 'Hypertension',
      medicalHistory: ['Asthma', 'Diabetes'],
      labResults: ['Blood Pressure: 130/90 mmHg', 'Blood Sugar: 110 mg/dL'],
    },
    {
      name: 'Jane Smith',
      age: 50,
      condition: 'Diabetes',
      medicalHistory: ['Hypertension'],
      labResults: ['Blood Sugar: 150 mg/dL'],
    }
  ];

  try {
    const insertedPatients = await Patient.insertMany(patients);
    console.log('Patients added:', insertedPatients);
    return insertedPatients;
  } catch (error) {
    console.error('Error inserting patients:', error);
  }
};

// Insert authorizations
const insertAuthorizations = async (patients) => {
  const authorizations = [
    {
      patientId: patients[0]._id,
      treatmentType: 'Medication',
      insurancePlan: 'Premium Health Plan',
      diagnosisCode: 'I10',
      notes: 'Immediate medication approval required',
      status: 'pending',
    },
    {
      patientId: patients[1]._id,
      treatmentType: 'Surgery',
      insurancePlan: 'Basic Health Plan',
    
      diagnosisCode: 'E11',
      notes: 'Surgery scheduled for next week',
      status: 'approved',
    }
  ];

  try {
    const insertedAuthorizations = await Authorization.insertMany(authorizations);
    console.log('Authorizations added:', insertedAuthorizations);
  } catch (error) {
    console.error('Error inserting authorizations:', error);
  }
};

// Main function to run
const run = async () => {
  await connectDB();
  const patients = await insertPatients();
  await insertAuthorizations(patients);
  mongoose.connection.close();
};

run();
