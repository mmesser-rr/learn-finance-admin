import { useState } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
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
    name: 'orgs',
    control,
  });
  const [indexToDelete, setIndexToDelete] = useState(-1)

  const handleAppend = () => {
    append({ displayName: '', relationshipType: 'ORGANIZER' });
  }
  const handleDeleteOrganization = () => {
    console.log('orgsForm => delete');
    remove(indexToDelete)
  }
  return (
    <div>
      <FormHeader title="ORGANIZATIONS" subtitle="Organizers, Owners & Sponsors." />

      <>
        {fields.map((item, index) => (
          <Grid
            container
            key={item.id}
            columnSpacing={2}
            direction="row"
            justifyContent="stretch"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={6}>
              {/* <input type="hidden" {...register(`orgs[${index}]organizationId`)} /> */}
              <Controller
                name={`orgs[${index}].displayName`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '100%' }}
                    className="mt-8 mb-16"
                    error
                    required
                    // helperText={errors.orgs?.[index]?.displayName}
                    label="Name"
                    autoFocus
                    variant="filled"
                  />
                )}
                defaultValue={item.displayName}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: '100%' }}>
                <InputLabel id={`orgs.${index}.relationshipType`}>
                  Relationship
                </InputLabel>
                <Controller
                  name={`orgs[${index}].relationshipType`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      // labelId={`orgs.${index}.relationshipType`}
                      // error={!!errors.orgs?.[index]?.relationshipType}
                      // name={`orgs.${index}.relationshipType`}
                      // id={`orgs.${index}.relationshipType`}
                      // {...register(`orgs.${index}.relationshipType`)}
                      required
                      label="Relationship"
                      // value={item.relationshipType}
                      // defaultValue=""
                    >
                      <MenuItem>...</MenuItem>
                      <MenuItem value="ORGANIZER">Organizer</MenuItem>
                      <MenuItem value="OWNER">Owner</MenuItem>
                      <MenuItem value="SPONSOR">Sponsor</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2} md={1}>
              <Box>
                <IconButton
                  variant="contained"
                  type="button"
                  // onClick={() => remove(index)}
                  onClick={() => {
                    setIndexToDelete(index)
                    setConfirmationDialogOpen(true)
                  }}
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
          onClick={() => handleAppend()}
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
