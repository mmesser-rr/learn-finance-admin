import { ThemeProvider } from "@mui/material/styles";
import NavbarToggleFab from "app/fuse-layouts/shared-components/NavbarToggleFab";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectNavbarTheme } from "app/store/fuse/settingsSlice";
import Navbar from "./navbar/Navbar";

function NavbarWrapperLayout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbar = useSelector(({ fuse }) => fuse.navbar);

  const navbarTheme = useSelector(selectNavbarTheme);
  console.log("NavbarWrapperLayout1 => style => ", config.navbar.style);
  return (
    <>
      <ThemeProvider theme={navbarTheme}>
        <>
          <Navbar />
        </>
      </ThemeProvider>

      {config.navbar.display && !config.toolbar.display && !navbar.open && (
        <NavbarToggleFab />
      )}
    </>
  );
}

export default memo(NavbarWrapperLayout1);
