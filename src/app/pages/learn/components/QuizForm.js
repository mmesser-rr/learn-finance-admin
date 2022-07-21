import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import AutocompleteChip from '../../../shared-components/AutocompleteChip';
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../../../shared-components/ConfirmationDialog";

export default ({ depositIndex, quizIndex, control }) => {
  return (
    <div>
      <Controller
        name={`deposits[${depositIndex}].questions[${quizIndex}].questionText`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            label="QuestionText"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name={`deposits[${depositIndex}].questions[${quizIndex}].correctAnswer`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            label="CorrectAnswer"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name={`deposits[${depositIndex}].questions[${quizIndex}].answers`}
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
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <AutocompleteChip {...getTagProps({ index })} label={option} />
              ));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ m: 1 }}
                placeholder="Input Several Answers"
                label="Answers"
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
};
