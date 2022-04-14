import { useForm, FormProvider, Controller } from 'react-hook-form';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';
import { SiDiscord } from 'react-icons/si';
import { motion } from 'framer-motion';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Form Validation Schema
const schema = yup.object().shape({
  // categories: yup.array().of(yup.string()).required('You must select at least one category'),
  firstName: yup.string().required('You must enter a First Name'),
});

function ProfileDetailsForm({ data, child }) {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: '',
      bio: 'bio',
    },
    resolver: yupResolver(schema),
  });
  const { control, formState, register, watch, getValues, setValue } = methods;
  const form = watch();
  const { errors } = formState;
  const { reset, onChange } = methods;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="md:flex max-w-2xl">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Personal Details
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <FormProvider {...methods}>
                <div className="flex flex-col md:flex-row flex-wrap gap-x-24">
                  <div className="md:px-10 min-w-24 pt-20" />

                  <div className="flex-auto">
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          sx={{ m: 1 }}
                          className="mt-8 mb-16"
                          error={!!errors.firstName}
                          required
                          helperText={errors?.firstName?.message}
                          label="First Name"
                          autoFocus
                          id="firstName"
                          variant="filled"
                          fullWidth
                        />
                      )}
                    />
                  </div>
                  <div className="flex-auto">
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          sx={{ m: 1 }}
                          className="mt-8 mb-16"
                          error={!!errors.lastName}
                          required
                          helperText={errors?.lastName?.message}
                          label="Last Name"
                          autoFocus
                          id="lastName"
                          variant="filled"
                          fullWidth
                        />
                      )}
                    />
                  </div>
                  <div className="md:px-10 min-w-12 pt-20" />
                </div>

                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <Icon color="action">email</Icon>
                  </div>

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        error={!!errors.email}
                        required
                        helperText={errors?.email?.message}
                        label="Email"
                        autoFocus
                        id="email"
                        variant="filled"
                        fullWidth
                        placeholder="Like name@domain.com"
                      />
                    )}
                  />
                </div>
                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <PersonIcon color="action" />
                  </div>
                  <Controller
                    name="bankDAOHandle"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        error={!!errors.bankDAOHandle}
                        required
                        helperText={errors?.bankDAOHandle?.message}
                        label="BankDAO Handle"
                        autoFocus
                        id="bankDAOHandle"
                        variant="filled"
                        fullWidth
                        placeholder="@"
                      />
                    )}
                  />
                </div>
                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <TwitterIcon color="action" />
                  </div>
                  <Controller
                    name="twitterHandle"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        error={!!errors.twitterHandle}
                        required
                        helperText={errors?.twitterHandle?.message}
                        label="Twitter Handle"
                        autoFocus
                        id="twitterHandle"
                        variant="filled"
                        fullWidth
                        placeholder="@"
                      />
                    )}
                  />
                </div>
                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <InstagramIcon color="action" />
                  </div>
                  <Controller
                    name="instagramHandle"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        error={!!errors.instagramHandle}
                        required
                        helperText={errors?.instagramHandle?.message}
                        label="Instagram Handle"
                        autoFocus
                        id="instagramHandle"
                        variant="filled"
                        fullWidth
                        placeholder="@"
                      />
                    )}
                  />
                </div>
                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <SiDiscord color="action" size={24} />
                  </div>
                  <Controller
                    name="discordHandle"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        error={!!errors.discordHandle}
                        required
                        helperText={errors?.discordHandle?.message}
                        label="Discord Handle"
                        autoFocus
                        id="discordHandle"
                        variant="filled"
                        fullWidth
                        placeholder="@"
                      />
                    )}
                  />
                </div>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
export default ProfileDetailsForm;
