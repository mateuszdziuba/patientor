import { HealthCheckEntry } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

const setColor = (state: number) => {
  switch (state) {
    case 0:
      return 'yellow';
    case 1:
      return 'green';
    case 2:
      return 'blue';
    case 3:
      return 'brown';
  }
};

const HealthCheckEntryBox = ({ entry }: { entry: HealthCheckEntry }) => (
  <div>
    {entry.date}
    <br />
    <em>{entry.description}</em>
    <br />
    <FavoriteIcon style={{ fill: setColor(entry.healthCheckRating) }} />
    <br />
    diagnose by {entry.specialist}
  </div>
);

export default HealthCheckEntryBox;
