import { HospitalEntry } from '../types';

const HospitalEntryBox = ({ entry }: { entry: HospitalEntry }) => (
  <div>
    {entry.date}
    <br />
    <em>{entry.description}</em>
    <br />
    diagnose by {entry.specialist}
  </div>
);

export default HospitalEntryBox;
