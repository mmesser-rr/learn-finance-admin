import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Form Validation Schema
const schema = yup.object().shape({
  // categories: yup.array().of(yup.string()).required('You must select at least one category'),
  subtitle: yup
    .string()
    .required('You must enter a subtitle')
    .min(5, 'The subtitle must be at least 5 characters'),
  title: yup
    .string()
    .required('You must enter a title')
    .min(5, 'The title must be at least 5 characters'),
  registrationUrl: yup
    .string()
    .url("The Registration URL must be a valid url like 'http://website.com/somelink'")
    .required('Please enter website'),
  websiteUrl: yup
    .string()
    .url("The Website URL must be a valid url like 'http://website.com/somelink'")
    .required('Please enter website'),
  organizations: yup.array().of(
    yup.object().shape({
      displayName: yup.string().required('Organization name is required'),
      relationshipType: yup.string().required('Relationship type is required'),
    })
  ),
});

function OpportunityForm({ data, child }) {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      // Basic Info
      heroPhotoUri: data.heroPhotoUri,
      categories: data.categories,
      // creator: data.creator,
      // createdDateTime: data.createdDateTime,
      details: data.details,
      detailsTldr: data.detailsTldr,
      endDateTime: data.endDateTime,
      eventType: data.eventType,
      id: data.id,
      isPrivate: data.isPrivate,
      location: { lat: 1, lon: -1 },
      locationDetail: {
        address: 'address',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zipCode: 'zip',
        country: 'country',
        name: 'name',
      },
      logoUri: data.logoUri,
      onlineReserved: data.onlineReserved,
      onlineTotal: data.onlineTotal,
      organizations: data.organizations?.items,
      registrationUrl: data.registrationUrl,
      reward: data.reward,
      rewardDetails: data.rewardDetails,
      seatsReserved: data.seatsReserved,
      seatsTotal: data.seatsTotal,
      startDateTime: data.startDateTime,
      status: data.status,
      subtitle: data.subtitle,
      tags: data.tags,
      title: data.title,
      timezone: data.timezone,
      // updatedDateTime: data.updatedDateTime,
      websitePrompt: data.websitePrompt,
      websiteUrl: data.websiteUrl,
    },
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, setValue, register } = methods;
  const form = watch();

  return <FormProvider {...methods}>{child}</FormProvider>;
}
export default OpportunityForm;
