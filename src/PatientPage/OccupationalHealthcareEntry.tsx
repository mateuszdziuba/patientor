import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryBox = ({
  entry
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <div>
    {entry.date}
    <br />
    <em>{entry.description}</em>
    <br />
    diagnose by {entry.specialist}
  </div>
);

export default OccupationalHealthcareEntryBox;
