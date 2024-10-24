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
        treatments: ['Blood Pressure Medication', 'Insulin for Diabetes'],
      },
      {
        name: 'Jane Smith',
        age: 50,
        condition: 'Diabetes',
        medicalHistory: ['Hypertension'],
        labResults: ['Blood Sugar: 150 mg/dL'],
        treatments: ['Metformin', 'Lifestyle Modifications'],
      },
      {
        name: 'Michael Johnson',
        age: 60,
        condition: 'Heart Disease',
        medicalHistory: ['High Cholesterol', 'Obesity'],
        labResults: ['Cholesterol: 220 mg/dL', 'Heart Rate: 80 bpm'],
        treatments: ['Statins for Cholesterol', 'Exercise Plan'],
      },
      {
        name: 'Emily Davis',
        age: 35,
        condition: 'Asthma',
        medicalHistory: ['Allergies'],
        labResults: ['Lung Capacity: 85%', 'Oxygen Saturation: 98%'],
        treatments: ['Inhaler', 'Antihistamines'],
      },
      {
        name: 'David Brown',
        age: 70,
        condition: 'Arthritis',
        medicalHistory: ['Hypertension', 'Diabetes'],
        labResults: ['Blood Pressure: 140/85 mmHg', 'Blood Sugar: 120 mg/dL'],
        treatments: ['Pain Relievers', 'Blood Pressure Medication', 'Insulin'],
      },
      {
        name: 'Sarah Wilson',
        age: 40,
        condition: 'Thyroid Disorder',
        medicalHistory: ['Hypertension'],
        labResults: ['TSH Level: 4.5 mIU/L'],
        treatments: ['Levothyroxine', 'Blood Pressure Medication'],
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
      dateOfService: new Date('2024-11-15'), 
    },
    {
      patientId: patients[1]._id,
      treatmentType: 'Surgery',
      insurancePlan: 'Basic Health Plan',
      diagnosisCode: 'E11',
      notes: 'Surgery scheduled for next week',
      status: 'approved',
      dateOfService: new Date('2024-12-01'), 
    },
    {
      patientId: patients[2]._id,
      treatmentType: 'Dialysis',
      insurancePlan: 'Kidney Care Plan',
      diagnosisCode: 'N18',
      notes: 'Dialysis scheduled for next month',
      status: 'approved',
      dateOfService: new Date('2025-01-10'), 
    },
    {
      patientId: patients[3]._id,
      treatmentType: 'Mental Health Therapy',
      insurancePlan: 'Mental Health Support Plan',
      diagnosisCode: 'F33',
      notes: 'Weekly therapy sessions required',
      status: 'pending',
      dateOfService: new Date('2024-11-25'), 
    },
    {
      patientId: patients[4]._id,
      treatmentType: 'COPD Medication',
      insurancePlan: 'Chronic Care Plan',
      diagnosisCode: 'J44',
      notes: 'New medication prescribed for COPD',
      status: 'approved',
      dateOfService: new Date('2024-12-05'), 
    },
    {
      patientId: patients[5]._id,
      treatmentType: 'Chemotherapy',
      insurancePlan: 'Oncology Care Plan',
      diagnosisCode: 'C50',
      notes: 'Chemotherapy scheduled for next month',
      status: 'pending',
      dateOfService: new Date('2025-01-15'), 
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
