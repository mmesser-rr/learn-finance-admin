import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPhoto, logoutUser } from "app/auth/store/userSlice";
import { theme } from "@fuse/default-settings/theme";
function UserMenu(props) {
  const { palette } = props.props;
  console.log("userMenu => props => ", props);
  localStorage.setItem("dirtyFieldsLength", '0')
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [userMenu, setUserMenu] = useState(null);

  useEffect(() => {
    // Amplify uses signed urls for images (s3)
    async function load() {
      const imgUrl = await dispatch(getPhoto(user.data.profilePhotoUri));
      console.log('imgUrl.payload', imgUrl.payload)
      setProfileImg(imgUrl.payload);
    }
    load();
  }, [dispatch, user]);
  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          {/* <Typography component="span" className="font-bold flex -mb-4 xyz"> */}
          <UserMenu.CurrentUserContainer>
            <UserMenu.CurrentUserNameContainer>
              {user.data.firstName} {user.data.lastName}
            </UserMenu.CurrentUserNameContainer>
            <UserMenu.CurrentUserRoleContainer>
              {user.role.toString()}
              {(!user.role ||
                (Array.isArray(user.role) && user.role.length === 0)) &&
                "Guest"}
            </UserMenu.CurrentUserRoleContainer>
          </UserMenu.CurrentUserContainer>
          {/* </Typography> */}
          <Typography className="text-11 font-medium capitalize"></Typography>
        </div>
        {profileImg ? (
          <Avatar className="md:mx-4" alt="user photo" src={profileImg} />
        ) : (
          <Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/pages/profile"
              onClick={(e) => {
                console.log("profile is clicked")
                const dirtyFieldsLength = Number(localStorage.getItem("dirtyFieldsLength"))
                if (dirtyFieldsLength > 0) {
                  e.preventDefault()
                  alert("Hahahahaha")
                }
                else {
                  userMenuClose()
                }
              }}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/apps/mail"
              onClick={(e) => {
                const dirtyFieldsLength = Number(localStorage.getItem("dirtyFieldsLength"))
                if (dirtyFieldsLength > 0) {
                  e.preventDefault()
                  alert("Hahahahaha")
                }
                else {
                  userMenuClose()
                }
              }}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;

UserMenu.CurrentUserContainer = styled.div`
  color: ${theme.colors.type.dark};
  text-align: right;
`;
UserMenu.CurrentUserNameContainer = styled.div`
  font-size: 1em;
  font-weight: 800;
`;
UserMenu.CurrentUserRoleContainer = styled.div`
  color: ${theme.colors.type.dark};
  font-size: 0.9em;
  font-weight: 500;
  margin-top: -5px;
  text-transform: capitalize;
`;
