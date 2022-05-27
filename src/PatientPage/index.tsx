import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FemaleOutlined, MaleOutlined } from '@mui/icons-material';
import { Button, Box } from '@material-ui/core';

import { Patient, Entry, EntryType } from '../types';
import { apiBaseUrl } from '../constants';
// import { useStateValue } from '../state';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import { addEntry, updatePatient, useStateValue } from '../state';
import { EntryFields } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const PatientPage = ({ id }: { id: string | undefined }) => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [, dispatch] = useStateValue();
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
          dispatch(updatePatient(id, currPatient));
        }
      } catch (error) {
        console.error(error);
      }
    };
    void getPatient();
  }, [id, setPatient]);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFields) => {
    try {
      if (patient && id) {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        console.log(patient.entries);
        dispatch(addEntry(id, newEntry));
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      }
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case EntryType.Hospital:
        return <HospitalEntry entry={entry} />;
      case EntryType.OccupationalHealthcare:
        return <OccupationalHealthcareEntry entry={entry} />;
      case EntryType.HealthCheck:
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
              <EntryDetails entry={entry} />
            </Box>
          ))}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </>
      )}
    </div>
  );
};

export default PatientPage;
