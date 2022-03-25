import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormContext, Controller } from 'react-hook-form';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name="eventType"
        control={control}
        render={({ field }) => (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="eventType">Event Type</InputLabel>
            <Select {...field} labelId="eventTypeLabel" id="eventType" label="Event Type">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="real_estate">Real Estate</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="status">Status</InputLabel>
            <Select {...field} labelId="statusLabel" id="status" label="Status" value="">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="isPrivate"
        control={control}
        render={({ field }) => (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="isPrivate">Private?</InputLabel>
            <Select {...field} labelId="isPrivateLabel" id="isPrivate" label="Private?">
              <MenuItem value="false">No</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.title}
            required
            helperText={errors?.title?.message}
            label="Title"
            autoFocus
            id="title"
            variant="standard"
            fullWidth
          />
        )}
      />

      <Controller
        name="subtitle"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.subtitle}
            required
            helperText={errors?.subtitle?.message}
            label="Subtitle"
            autoFocus
            id="title"
            variant="standard"
            fullWidth
          />
        )}
      />

      <Controller
        name="details"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            id="details"
            label="Full Description - Tell users all about your Opportunity or Event"
            type="text"
            multiline
            rows={5}
            variant="standard"
            fullWidth
          />
        )}
      />

      <Controller
        name="detailsTldr"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            id="detailsTldr"
            label="Brief Description"
            placeholder="Keep it short - maybe 20 words or less."
            type="text"
            multiline
            rows={2}
            variant="standard"
            fullWidth
          />
        )}
      />

      <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ m: 1 }}
                placeholder="Select multiple categories"
                label="Categories"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ m: 1 }}
                placeholder="Select multiple tags"
                label="Tags"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
