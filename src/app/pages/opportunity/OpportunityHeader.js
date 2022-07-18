import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { Storage } from "aws-amplify";
import { styled, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import _ from "@lodash";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { removeOpportunity, saveOpportunityThunk, createOpportunityThunk } from "../store/opportunitySlice";

const CustomButton = styled(Button)`
  :disabled {
    color: #ffffff;
    background-color: #b1b3b4;
  }
`;
function OpportunityHeader(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  localStorage.setItem("dirtyFieldsLength", Object.keys(dirtyFields).length);
  const logoUri = watch("logoUri");
  const heroPhotoUri = watch("heroPhotoUri");
  const title = watch("title");
  const subtitle = watch("subtitle");
  const orgs = watch("orgs");
  const [saveStatus, setSaveStatus] = useState("Save");
  const theme = useTheme();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function getImage() {
      let imgSrc = logoUri;
      if (logoUri?.startsWith("opportunities")) {
        console.log("opportunityHeader => logoUri => ", logoUri);

        imgSrc = await Storage.get(logoUri, { download: false });
        console.log("opportunityHeader => logoUriFetched => ", imgSrc);
      }
      setImageUrl(imgSrc);
    }
    getImage();
  }, [logoUri]);

  async function handleSaveOpportunity() {
    // removed setSaveStatus() function because this page will be navigated to `/pages/Opportunity/...`
    const formValues = {
      ...getValues(),
      creatorId: user.data.id,
      onlineTotal: 0,
      onlineReserved: 0
    };
    console.log('formValues', formValues)
    await dispatch(formValues?.id ? saveOpportunityThunk(formValues) : createOpportunityThunk(formValues)).then((action) => {
      console.log("opportunityHeader => save => ", action);
      const item = formValues?.id ? action.payload : action.payload;
      navigate(
        `/pages/Opportunity/${item.id}/${item.title?.replaceAll(" ", "_")}`
      );
    });
  }

  function handleRemoveOpportunity() {
    const { id } = getValues()
    dispatch(removeOpportunity(id)).then(() => {
      navigate("/pages/Opportunities");
    });
  }

  return (
    <div className="flex flex-1 w-full items-center justify-between ">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/pages/Opportunities"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              Opportunities
            </span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {logoUri ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={imageUrl}
                alt={title}
              />
            ) : (
              <div className="2-32 sm:w-48 rounded" />
            )}
          </motion.div>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {title || "New Opportunity"}
              </Typography>
              <Typography variant="caption" className="font-medium">
                {subtitle || "Opportunity Detail"}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveOpportunity}
          startIcon={<Icon className="hidden sm:flex">delete</Icon>}
        >
          Remove
        </Button>
        <CustomButton
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSaveOpportunity}
        >
          {saveStatus}
        </CustomButton>
      </motion.div>
    </div>
  );
}

export default OpportunityHeader;
