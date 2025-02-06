# 🏥 FHIR to CSV Mapper

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Required-green.svg)

A Node.js script that transforms FHIR (Fast Healthcare Interoperability Resources) JSON data into structured CSV files for healthcare data integration.

## 🎯 Overview

This script processes FHIR resources including Patient, Provider, and Encounter data, transforming them into easily manageable CSV formats. Perfect for healthcare data migrations, analytics, and system integrations.

## ⚙️ Features

- 🔄 Converts FHIR JSON to CSV format
- 👤 Processes Patient demographics
- 👨‍⚕️ Handles Provider information
- 🏥 Manages Encounter data
- 📅 Standardized date formatting
- ⚡ Efficient data transformation
- 🔍 OID to ID type mapping

## 📋 Prerequisites

- Node.js installed
- `json2csv` npm package
- Source FHIR JSON files in `resources` folder

## 📁 File Structure

```
├── resources/
│   ├── fhir_sample_patient.json
│   ├── fhir_sample_provider.json
│   ├── fhir_sample_encounter.json
│   └── fhir_sample_oru.json
├── csv/
│   ├── Patient.csv
│   ├── Provider.csv
│   └── Encounter.csv
└── mapper.js
```

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fhir-csv-mapper

# Install dependencies
npm install json2csv
```

## 💻 Usage

1. Place your FHIR JSON files in the `resources` folder
2. Run the script:
```bash
node mapper.js
```
3. Find converted CSV files in the `csv` folder

## 📄 Output Format

### Patient CSV
- Patient_ID
- First/Last Name
- DOB
- Gender
- Contact Information
- Address Details
- Status Information

### Provider CSV
- Provider_ID
- Personal Information
- Specialty
- Organization
- Contact Details

### Encounter CSV
- Encounter_ID
- Patient/Practitioner References
- Encounter Details
- Status Information

## 🛠️ Core Functions

```javascript
// Date formatting
formatDate(dateString) → MM/DD/YYYY

// Gender standardization
convertGender(gender) → M/F/U

// OID mapping
mapOidToIdType(oid) → ID type string
```

## 👤 Author

Glenn R. Tomassi

## 📝 License

Make yourself at 🏠.

---
Made with ❤️ for healthcare interoperability
