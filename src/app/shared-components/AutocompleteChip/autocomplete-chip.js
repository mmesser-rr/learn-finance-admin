import Chip from '@mui/material/Chip';

const AutocompleteChip = (props) => {
  return (
    <div className="my-6">
      <Chip {...props} color="secondary" />
    </div>
  );
};

export default AutocompleteChip;
