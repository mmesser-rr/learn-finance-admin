import { useForm, FormProvider, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import { SiDiscord } from "react-icons/si";
import { motion } from "framer-motion";
import MuiPhoneNumber from "material-ui-phone-number";
import _ from "@lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveProfile } from "../../store/profileSlice";

// Form Validation Schema
const phoneRegExp = /^[/+]?[(]?[0-9]{3}[)]?[-\s/.]?[0-9]{3}[-\s/.]?[0-9]{4,6}$/;
const schema = yup.object().shape({
  // categories: yup.array().of(yup.string()).required('You must select at least one category'),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobilePhone: yup.string().min(10).max(24), // matches(phoneRegExp, 'Invalid Phone'),
});

function ProfileDetailsForm() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      id: user.id,
      isActive: true,
      firstName: user.data.firstName,
      lastName: user?.data?.lastName,
      mobilePhone: user?.data?.mobilePhone,
      email: user?.data?.email,
      bio: user?.data?.bio,
      address: {},
      handle: user?.data?.handle,
    },
    resolver: yupResolver(schema),
  });
  const {
    control,
    formState,
    // register,
    // watch,
    getValues,
    // setValue
  } = methods;
  const { isValid, dirtyFields } = formState;
  // const form = watch();
  const { errors } = formState;
  const { reset, onChange } = methods;

  function handleSaveProfile() {
    dispatch(saveProfile(getValues()));
  }

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
          <FormProvider {...methods}>
            <Card
              component={motion.div}
              variants={item}
              className="w-full mb-32 rounded-16 shadow"
            >
              <AppBar position="static" elevation={0}>
                <Toolbar className="px-8">
                  <Typography
                    variant="subtitle1"
                    color="default"
                    className="flex-1 px-12 font-medium"
                  >
                    Personal Details
                  </Typography>
                </Toolbar>
              </AppBar>

              <CardContent>
                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <PersonIcon color="action" />
                  </div>

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
                          id="firstName"
                          variant="filled"
                          fullWidth
                        />
                      )}
                    />
                  </div>
                  <div className="flex-auto ml-10">
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
                    <Icon color="action">phone</Icon>
                  </div>
                  <Controller
                    name="mobilePhone"
                    control={control}
                    render={({ field }) => (
                      <MuiPhoneNumber
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        error={!!errors.mobilePhone}
                        required
                        helperText={errors?.mobilePhone?.message}
                        label="Mobile Phone"
                        id="mobilePhone"
                        variant="filled"
                        fullWidth
                        placeholder="Full phone number with Country Code like +1 555 555 5555"
                        defaultCountry="us"
                        disableAreaCodes="true"
                      />
                    )}
                  />
                </div>
                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <Icon color="action">fingerprint</Icon>
                  </div>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        id="bio"
                        label="Bio"
                        type="text"
                        multiline
                        rows={5}
                        variant="filled"
                        fullWidth
                      />
                    )}
                  />
                </div>
                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20">
                    <Typography variant="h4" className="-mt-7">
                      💰
                    </Typography>
                  </div>
                  <Controller
                    name="handle"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ m: 1 }}
                        className="mt-8 mb-16"
                        error={!!errors.handle}
                        required
                        helperText={errors?.handle?.message}
                        label="BankDAO Handle"
                        id="handle"
                        variant="filled"
                        fullWidth
                        placeholder="@"
                      />
                    )}
                  />
                </div>

                <div className="flex">
                  <div className="md:px-10 min-w-48 pt-20" />
                  <div className="my-20">
                    <Typography variant="h6">Social Handles</Typography>
                  </div>
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
                        id="discordHandle"
                        variant="filled"
                        fullWidth
                        placeholder="@"
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-end -mx-4 mt-24 mr-24 md:mt-0">
              <Button
                className="mt-8 mb-36"
                variant="contained"
                color="secondary"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                aria-label="Follow"
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </div>
          </FormProvider>
        </div>
      </div>
    </motion.div>
  );
}
export default ProfileDetailsForm;
