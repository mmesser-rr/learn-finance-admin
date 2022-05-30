import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Logo from "app/fuse-layouts/shared-components/Logo";
import NavbarToggleButton from "app/fuse-layouts/shared-components/NavbarToggleButton";
import Navigation from "app/fuse-layouts/shared-components/Navigation";
// import UserNavbarHeader from "app/fuse-layouts/shared-components/UserNavbarHeader";
import clsx from "clsx";
import { memo } from "react";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.24)"
        : "rgba(255, 255, 255, 0.24)"
    }`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.37)"
        : "rgba(255, 255, 255, 0.37)"
    }`,
  },
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
}));

function NavbarContent(props) {
  const { isMobile } = props;
  const theme = useTheme();
  return (
    <Root
      className={clsx(
        "flex flex-auto flex-col overflow-hidden h-full",
        props.className
      )}
    >
      {isMobile === true && (
        <div
          // color="secondary"
          position="static"
          className="flex flex-row items-center shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0"
        >
          <div className="flex w-full items-center flex-1 mx-4">
            <NavbarToggleButton className="w-40 h-40 p-0" />
          </div>
        </div>
      )}

      <StyledContent
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        {/* This is the Avatar w/ Name <UserNavbarHeader /> */}
        <Navigation layout="vertical" />
      </StyledContent>
    </Root>
  );
}
NavbarContent.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default memo(NavbarContent);
