import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { useStateValue } from '../state';
import { EntryType, HealthCheckRating } from '../types';

import { TextField, SelectField, DiagnosisSelection } from './FormField';
import { EntryOption, RatingOption } from './FormField';

export type EntryFields = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  type: string;
  healthCheckRating: number;
  employerName: string;
  dischargeDate: string;
  dischargeCriteria: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
};

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

const typeOptions: EntryOption[] = [
  { value: EntryType.HealthCheck, label: 'Health check' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational healthcare' }
];

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' }
];

interface Props {
  onSubmit: (values: EntryFields) => void;
  onCancel: () => void;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ value: EntryType }> = ({ value }) => {
  switch (value) {
    case EntryType.Hospital:
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="Date"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer"
            placeholder="Emplyer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick leave start date"
            placeholder="Date"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick leave end date"
            placeholder="Date"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </>
      );
    case EntryType.HealthCheck:
      return (
        <SelectField
          label="Health rating"
          name="healthCheckRating"
          options={ratingOptions}
        />
      );
    default:
      return assertNever(value);
  }
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: '',
        type: EntryType.Hospital,
        healthCheckRating: HealthCheckRating.Healthy,
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: ''
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            <EntryDetails value={values.type} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right'
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
