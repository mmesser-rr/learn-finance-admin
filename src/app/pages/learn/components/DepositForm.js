import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from '@mui/material/IconButton';
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHeader from "../../../shared-components/FormHeader";
import QuizForm from "./QuizForm";
import ConfirmationDialog from '../../../shared-components/ConfirmationDialog';

function DepositForm({ control, depositIndex }) {
  
  const {
    fields: questions,
    remove,
    append,
  } = useFieldArray({
    control,
    name: `deposits[${depositIndex}].questions`,
  });

  const [quizIndexToDelete, setQuizIndexToDelete] = useState(-1);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleAppendQuiz = () => {
    append({ questionText: "", correctAnswer: "", answers: [] });
  };
  const handleDeleteQuiz = () => {
    remove(quizIndexToDelete);
  };

  return (
    <div>
      <Controller
        name={`deposits[${depositIndex}].videoUri`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            label="VideoUri"
            variant="filled"
            fullWidth
          />
        )}
      />

      <Controller
        name={`deposits[${depositIndex}].title`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ m: 1 }}
            className="mt-8 mb-16"
            required
            label="Title"
            variant="filled"
            fullWidth
          />
        )}
      />

      {questions.map((quiz, quizIndex) => (
        <div key={quizIndex}>
          <QuizForm {...{ control, quizIndex, depositIndex }} />
          <Grid item xs={2} md={1}>
            <Box>
              <IconButton
                variant="contained"
                type="button"
                // onClick={() => remove(index)}
                onClick={() => {
                  setQuizIndexToDelete(quizIndex);
                  setConfirmationDialogOpen(true);
                }}
                sx={{ marginTop: "16px" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </div>
      ))}

      <Box className="my-24">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          type="button"
          onClick={() => handleAppendQuiz()}
        >
          Add Quiz
        </Button>
      </Box>
      <ConfirmationDialog
        id="deleteConfirmation"
        keepMounted
        open={confirmationDialogOpen}
        onOK={() => handleDeleteQuiz()}
        onClose={() => setConfirmationDialogOpen(false)}
      />
    </div>
  );
}

export default DepositForm;