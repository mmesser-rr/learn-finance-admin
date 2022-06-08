import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationInput from "../../../shared-components/LocationInput";
import FormHeader from "../../../shared-components/FormHeader";

function WhenWhereForm() {
  const methods = useFormContext();
  const { control, formState, register, watch, setValue } = methods;
  const { errors } = formState;
  // const [startDate, setStartDate] = useState(Date.now());
  const eventType = watch("eventType");
  const onlineTotal = watch("onlineTotal");
  const { address, unit, city, state, zipCode, country, name } =
    watch("locationDetail");
  const setAddress = (_address) => {
    console.log("_address", _address);
    setValue("locationDetail", {
      unit,
      city,
      state,
      zipCode,
      country,
      name,
      address: _address,
    });
  };
  useEffect(() => {
    if (onlineTotal === "") {
      setValue("onlineTotal", 0);
    }
  }, [onlineTotal, setValue]);
  return (
    <div>
      <FormHeader
        title="WHEN & WHERE"
        subtitle="Make your mark and let people know when and where they can find your event."
      />
      {(eventType === "IRL" || eventType === "HYBRID") && (
        <LocationInput address={address} setAddress={setAddress} />
      )}

      <Controller
        name="locationDetail"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ display: "none" }}
            className="mt-8 mb-16"
            error={!!errors.locationDetail}
            required
            helperText={errors?.locationDetail?.message}
            label="Location Detail"
            autoFocus
            id="locationDetail"
            variant="filled"
            fullWidth
          />
        )}
      />

      {(eventType === "IRL" || eventType === "HYBRID") && (
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
              label="In-Person Seats"
              autoFocus
              id="seatsTotal"
              variant="filled"
            />
          )}
        />
      )}

      {(eventType === "VIRTUAL" || eventType === "HYBRID") && (
        <Controller
          name="onlineTotal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ m: 1, minWidth: 120 }}
              className="mt-8 mb-16"
              error={!!errors.onlineTotal}
              required
              helperText={errors?.onlineTotal?.message}
              label="Online Seats"
              autoFocus
              id="onlineTotal"
              variant="filled"
            />
          )}
        />
      )}
      {eventType === "IRL" && (
        <input
          type="hidden"
          {...register("onlineTotal")}
          id="onlineTotal"
          name="onlineTotal"
          value="0"
        />
      )}
      <Controller
        name="registrationUrl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            error={!!errors.registrationUrl}
            required
            helperText={errors?.registrationUrl?.message}
            label="Registration Url"
            autoFocus
            id="registrationUrl"
            variant="filled"
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
            variant="filled"
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
            variant="filled"
            fullWidth
          />
        )}
      />
      <div className="flex flex-row mt-24">
        <div className="basis-1/2 ml-8">
          <Typography>Start Date & Time</Typography>
        </div>
        <div className="basis-1/2 ml-8">
          <Typography>End Date & Time</Typography>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2">
          <Controller
            name="startDateTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={value}
                  onChange={onChange}
                  renderInput={(_props) => (
                    <TextField
                      label="Start Date"
                      className="mt-8 mb-16 mx-4"
                      {..._props}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </div>
        <div className="basis-1/2">
          <Controller
            name="endDateTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={value}
                  onChange={onChange}
                  renderInput={(_props) => (
                    <TextField
                      label="Start Date"
                      className="mt-8 mb-16 mx-4"
                      {..._props}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default WhenWhereForm;
