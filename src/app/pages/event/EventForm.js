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

function EventForm({ data, child }) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      sponsor: data.sponsor,
      title: data.title,
      category: data.category ?? "",
      heroPhotoUri: data.heroPhotoUri,
      logoUri: data.logoUri,
      tagline: data.tagline,
      description: data.description,
      dateTime: data.dateTime,
      location: data.location,
      reward: data.reward
    },
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, setValue, register } =
    methods;
  const form = watch();

  return <FormProvider {...methods}>{child}</FormProvider>;
}
export default EventForm;
