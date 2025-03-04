import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
      patientId: string;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
      patientId: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: action.payload
        }
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case 'ADD_ENTRY':
      console.log(state.patients[action.patientId]);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: {
            ...state.patients[action.patientId],
            entries: [
              ...state.patients[action.patientId].entries,
              action.payload
            ]
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (api: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: api
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const updatePatient = (patientId: string, patient: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient,
    patientId
  };
};

export const setDiagnosesList = (api: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: api
  };
};

export const addEntry = (patientId: string, entry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: entry,
    patientId
  };
};
