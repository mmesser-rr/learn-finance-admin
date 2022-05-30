import { memo, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";

const useEnhancedEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function FuseTheme(props) {
  const direction = useSelector(({ fuse }) => fuse.settings.defaults.direction);
  const mainTheme = useSelector(selectMainTheme);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  // console.warn('FuseTheme:: rendered',mainTheme);
  return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

FuseTheme.propTypes = {
  children: PropTypes.object,
};

export default memo(FuseTheme);
