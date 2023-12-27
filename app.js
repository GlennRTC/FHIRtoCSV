/*
  Name: FHIR to CSV Mapper
  Version: 1.0 
  Description: This script reads FHIR (Fast Healthcare Interoperability Resources) data from JSON files,
  processes and transforms patient, provider, and encounter resources, and saves the transformed
  data into CSV files. The FHIR resources are read from files ('fhir_sample_patient.json', 
  'fhir_sample_provider.json', 'fhir_sample_encounter.json', 'fhir_sample_oru.json') and processed
  using functions for data transformation. The transformed data is then saved into CSV files in
  the 'csv' folder. Date formatting, gender conversion, and OID-to-ID type mapping functions are
  utilized for data processing.
  Usage:
    1. Ensure FHIR JSON files are available in the 'resources' folder.
    2. Run the script to transform and save patient, provider, and encounter data into CSV files.
  Author: Glenn R. Tomassi 
*/

const fs = require('fs');
const json2csv = require('json2csv').Parser;

// Read FHIR resources from files
const patientData = JSON.parse(fs.readFileSync('resources/fhir_sample_patient.json'));
const providerData = JSON.parse(fs.readFileSync('resources/fhir_sample_provider.json'));
const encounterData = JSON.parse(fs.readFileSync('resources/fhir_sample_encounter.json'));
const oruData = JSON.parse(fs.readFileSync('resources/fhir_sample_oru.json'));

// Function to convert date to MM/DD/YYYY format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Function to convert gender values to M, F, or U
const convertGender = (gender) => {
  switch (gender) {
    case 'male':
      return 'M';
    case 'female':
      return 'F';
    default:
      return 'U';
  }
};

// Function to map OID to ID type
const mapOidToIdType = (oid) => {
  switch (oid) {
    case 'Urn:oid:2.16.528.1.1007.3.1':
      return 'NPI';
    case 'Urn:oid:2.16.840.1.113883.2.4.6.3':
      return 'EHR ID';
    case 'Urn:oid:2.16.840.1.113883.2.4.6.3':
      return 'MRN';
    default:
      return 'Unknown';
  }
};

// Function to process patient resource
const processPatient = (patient, encounter) => {
  // Variables
  var givenName = patient.name[0].given[0];
  var familyName = patient.name[0].family[0];
  var cityAdd = patient.address[0].city;
  var line = patient.address[0].line[0];
  var countryAdd = patient.address[0].country;
  var postalCode = patient.address[0].postalCode;

  // Extract information and apply transformations
  const data = {
    Patient_ID: patient.id,
    first_name: givenName,
    last_name: familyName,
    suffix: patient.name[0].suffix[0],
    prefix: "",
    dob: formatDate(patient.birthDate),
    gender: convertGender(patient.gender),
    address1: line,
    address2: "",
    city: cityAdd,
    state: "",
    zip: postalCode,
    country: countryAdd,
    phone: patient.telecom[0].value,
    marital_status: patient.maritalStatus.coding[0].display,
    death_date: "",
    patient_status: encounter.status,
    email: patient.telecom[1].value
  };
  return data;
};

// Function to process provider resource
const processProvider = (provider) => {
  // Variables
  var ProviderGivenName = provider.name.given[0];
  var ProviderFamilyName = provider.name.family[0];
  // Extract relevant information and apply transformations
  const data = {
    provider_id: provider.id,
    first_name: ProviderGivenName,
    last_name: ProviderFamilyName,
    suffix: provider.name.suffix[0],
    dob: formatDate(provider.birthDate),
    gender: convertGender(provider.gender),
    specialty: provider.practitionerRole[0].specialty[1],
    organization: provider.practitionerRole[0].managingOrganization[1],
    other_id: "",
    id_type: "",
    phone: provider.telecom[0].value,
    email: provider.telecom[1].value
  };
  return data;
};

// Function to process encounter resource
const processEncounter = (encounter) => {
  // Variables
  var pat_ids = encounter.patient.reference;
  var pract_ids = encounter.participant[0].individual.reference;
  // Extract relevant information and apply transformations
  const data = {
    encounter_id: encounter.id,
    patient_id: pat_ids.split("/")[1],
    practitioner_id: pract_ids.split("/")[1],
    encounter_date: "",
    encounter_reason: encounter.reason[0].coding[2],
    encounter_status: encounter.status,
    encounter_notes: "",
    encounter_status: encounter.status
  };
  return data;
};

// Convert and save data to CSV
const saveToCSV = (data, fileName) => {
  const parser = new json2csv();
  const csv = parser.parse(data);
  const folderPath = 'csv'
  fs.writeFileSync(`${folderPath}/${fileName}.csv`, csv);
};

// Transform and save patient data
const transformedPatientData = processPatient(patientData, encounterData);
saveToCSV(transformedPatientData, 'Patient');

// Transform and save provider data
const transformedProviderData = processProvider(providerData);
saveToCSV(transformedProviderData, 'Provider');

// Transform and save encounter data
const transformedEncounterData = processEncounter(encounterData);
saveToCSV(transformedEncounterData, 'Encounter');
