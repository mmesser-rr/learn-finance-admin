import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Form Validation Schema
const schema = yup.object().shape({
  // categories: yup.array().of(yup.string()).required('You must select at least one category'),
  title: yup
    .string()
    .required("You must enter a title")
    .min(5, "The title must be at least 5 characters")
});

function LearnForm({ data, child }) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      bgImageUri: data.bgImageUri,
      sponsor: data.sponsor,
      title: data.title,
      level: data.level,
      reward: data.reward,
      deposits: data.deposits
    },
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, setValue, register } =
    methods;
  const form = watch();

  return <FormProvider {...methods}>{child}</FormProvider>;
}
export default LearnForm;
