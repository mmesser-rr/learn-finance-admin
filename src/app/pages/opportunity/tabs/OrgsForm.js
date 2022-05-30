import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ConfirmationDialog from '../../../shared-components/ConfirmationDialog';
import FormHeader from '../../../shared-components/FormHeader';

function OrgsForm(props) {
  const methods = useFormContext();
  const { control, formState, register } = methods;
  const { errors } = formState;
  const { showStatus } = props;
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({
    name: 'organizations',
    control,
  });
  const numberOfOrgs = 1;

  function handleAppend() {
    append({ displayName: '', relationshipType: 'SPONSOR' });
  }
  function handleDeleteOrganization() {
    console.log('orgsForm => delete');
  }
  return (
    <div>
      <FormHeader title="ORGANIZATIONS" subtitle="Organizers, Owners & Sponsors." />

      <>
        {fields.map((item, index) => (
          <Grid
            container
            key={index}
            columnSpacing={2}
            direction="row"
            justifyContent="stretch"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={6}>
              <input type="hidden" {...register(`organizations[${index}].organizationId`)} />
              <TextField
                // {...field}
                sx={{ width: '100%' }}
                className="mt-8 mb-16"
                error={!!errors.organizations?.[index]?.displayName}
                name={`organizations[${index}].displayName`}
                id={`organizations[${index}].displayName`}
                {...register(`organizations.${index}.displayName`)}
                required
                helperText={errors.organizations?.[index]?.displayName?.message}
                label="Name"
                autoFocus
                variant="filled"
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: '100%' }}>
                <InputLabel id={`organizations[${index}].relationshipType`}>
                  Relationship
                </InputLabel>
                <Select
                  // {...field}
                  labelId={`organizations[${index}].relationshipType`}
                  error={!!errors.organizations?.[index]?.relationshipType}
                  name={`organizations[${index}].relationshipType`}
                  id={`organizations[${index}].relationshipType`}
                  {...register(`organizations.${index}.relationshipType`)}
                  required
                  label="Relationship"
                  value={item.relationshipType}
                  defaultValue=""
                >
                  <MenuItem>...</MenuItem>
                  <MenuItem value="ORGANIZER">Organizer</MenuItem>
                  <MenuItem value="OWNER">Owner</MenuItem>
                  <MenuItem value="SPONSOR">Sponsor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} md={1}>
              <Box>
                <IconButton
                  variant="contained"
                  type="button"
                  // onClick={() => remove(index)}
                  onClick={() => setConfirmationDialogOpen(true)}
                  sx={{ marginTop: '16px' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ))}
      </>
      <Box className="my-24">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          type="button"
          onClick={() => append({ displayName: '', relationshipType: 'OWNER' })}
        >
          Add Organization
        </Button>
      </Box>
      <ConfirmationDialog
        id="deleteConfirmation"
        keepMounted
        open={confirmationDialogOpen}
        onOK={() => handleDeleteOrganization()}
        onClose={() => setConfirmationDialogOpen(false)}
      />
    </div>
  );
}

export default OrgsForm;
