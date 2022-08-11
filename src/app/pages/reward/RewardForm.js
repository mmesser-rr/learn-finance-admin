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

function RewardForm({ data, child }) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      id: data.id,
      title: data.title,
      wealthAmount: data.wealthAmount,
      heroPhotoUri: data.heroPhotoUri,
      logoUri: data.logoUri,
      description: data.description
    },
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, setValue, register } =
    methods;
  const form = watch();

  return <FormProvider {...methods}>{child}</FormProvider>;
}
export default RewardForm;
