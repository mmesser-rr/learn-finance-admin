import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormContext, Controller } from 'react-hook-form';
import FormHeader from '../../../shared-components/FormHeader';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const { showStatus } = props;
  return (
    <div>
      <FormHeader
        title="Event Information"
        subtitle="Let users know the basics including the reward for attending."
      />
      <Controller
        name="eventType"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="eventType">Event Type</InputLabel>
            <Select {...field} labelId="eventTypeLabel" id="eventType" label="Event Type">
              <MenuItem value="IRL">In Person</MenuItem>
              <MenuItem value="VIRTUAL">Online</MenuItem>
              <MenuItem value="HYBRID">Hybrid - Both In-Person & Online</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      {showStatus && (
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="status">Status</InputLabel>
              <Select {...field} labelId="statusLabel" id="status" label="Status" disabled>
                <MenuItem value="" />
                <MenuItem value="PENDING">Pending Review</MenuItem>
                <MenuItem value="REJECTED">Rejected</MenuItem>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="CLOSED">Closed</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      )}

      <Controller
        name="isPrivate"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
            variant="filled"
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
            variant="filled"
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
            variant="filled"
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
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name="reward"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.reward}
            required
            helperText={errors?.reward?.message}
            label="Reward Amount"
            autoFocus
            id="reward"
            variant="filled"
          />
        )}
      />

      <Controller
        name="rewardDetails"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="rewardDetailsLabel">Reward Type</InputLabel>
            <Select {...field} labelId="rewardDetailsLabel" id="rewardDetails" label="Reward Type">
              <MenuItem value="" />
              <MenuItem value="$WEALTH">$WEALTH Token</MenuItem>
              <MenuItem value="ETH">Ether</MenuItem>
            </Select>
          </FormControl>
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
            // freeSolo
            options={[
              'Art',
              'Cars & Collectibles',
              'Commercial Real Estate',
              'Crypto',
              'Distressed Assets',
              'Mutual Funds',
              'Residential Real Estate',
              'Franchise',
              'Insurance',
              'NFT',
              'Real Estate',
              'Stocks',
              'VC',
            ]}
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
                variant="filled"
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
                variant="filled"
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
