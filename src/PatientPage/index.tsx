import { useEffect, useState } from 'react';
import axios from 'axios';
import { FemaleOutlined, MaleOutlined } from '@mui/icons-material';
import { Box } from '@material-ui/core';

import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
// import { useStateValue } from '../state';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const PatientPage = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient | undefined>();
  // const [{ diagnoses }] = useStateValue();
  useEffect(() => {
    const getPatient = async () => {
      try {
        if (id) {
          const response = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          const currPatient: Patient = response.data;
          setPatient(currPatient);
          console.log(currPatient);
        }
      } catch (error) {
        console.error(error);
      }
    };
    void getPatient();
  }, [id, setPatient]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntry entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  return (
    <div className="App">
      {!patient ? (
        <h2>Patient not found</h2>
      ) : (
        <>
          <h2>
            {patient.name}{' '}
            {patient.gender === 'male' ? <MaleOutlined /> : <FemaleOutlined />}
          </h2>
          <p>
            ssn: {patient.ssn}
            <br />
            occupation {patient.occupation}
          </p>
          <h3>entries</h3>
          {patient.entries.map((entry) => (
            <Box
              key={entry.date}
              sx={{
                borderRadius: '16px',
                borderColor: 'black',
                border: 1
              }}
              style={{
                borderStyle: 'solid',
                padding: '0.5em',
                marginBlock: '0.5em'
              }}
            >
              {EntryDetails({ entry })}
            </Box>
          ))}
        </>
      )}
    </div>
  );
};

export default PatientPage;
