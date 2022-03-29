import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { DateTimePicker } from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationInput from '../../../shared-components/LocationInput';

function WhenWhereTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [startDate, setStartDate] = useState(Date.now());

  return (
    <div>
      <LocationInput />
      <Controller
        name="inPerson"
        control={control}
        render={({ field }) => (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="inPerson">In Person?</InputLabel>
            <Select
              {...field}
              labelId="inPersonLabel"
              id="inPerson"
              label="In Person?"
              value={field.value}
            >
              <MenuItem value="false">No</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="seatsTotal"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.seatsTotal}
            required
            helperText={errors?.seatsTotal?.message}
            label="Total Seats"
            autoFocus
            id="seatsTotal"
            variant="standard"
            fullWidth
          />
        )}
      />
      <Controller
        name="websiteUrl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.websiteUrl}
            required
            helperText={errors?.websiteUrl?.message}
            label="Website Url"
            autoFocus
            id="websiteUrl"
            variant="standard"
            fullWidth
          />
        )}
      />
      <Controller
        name="websitePrompt"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.websitePrompt}
            required
            helperText={errors?.websitePrompt?.message}
            label="Website Prompt"
            autoFocus
            id="websitePrompt"
            variant="standard"
            fullWidth
          />
        )}
      />
      <div className="flex -mx-4">
        <Controller
          name="startDateTime"
          control={control}
          defaultValue={Date.now()}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              value={value}
              onChange={onChange}
              maxDate={value}
              renderInput={(_props) => (
                <TextField label="Start Date" className="mt-8 mb-16 mx-4" {..._props} />
              )}
            />
          )}
        />

        <Controller
          name="endDateTime"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              value={value}
              onChange={onChange}
              minDate={Date.now()}
              renderInput={(_props) => (
                <TextField label="End Date" className="mt-8 mb-16 mx-4" {..._props} />
              )}
            />
          )}
        />
      </div>
    </div>
  );
}

export default WhenWhereTab;
