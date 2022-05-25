import { useEffect, useState } from 'react';
import axios from 'axios';
import { FemaleOutlined, MaleOutlined } from '@mui/icons-material';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient | undefined>();
  useEffect(() => {
    const getPatient = async () => {
      try {
        if (id) {
          const response = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          const currPatient: Patient = response.data;
          setPatient(currPatient);
        }
      } catch (error) {
        console.error(error);
      }
    };
    void getPatient();
  }, [id, setPatient]);
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
        </>
      )}
    </div>
  );
};

export default PatientPage;
