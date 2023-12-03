import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { ButtonBase, Typography } from "@mui/material";

// project imports
import config from "config";
import Logo from "./Logo";
import { MENU_OPEN } from "store/actions";
import { useTheme } from "@mui/material/styles";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  // const defaultId = useSelector((state) => state.customization.defaultId);
  const theme = useTheme();
  const defaultId = 1;
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      {/* <Logo /> */}
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color={theme.palette.secondary.dark}
        // onClick={() => navigate("/home")}
        // sx={{
        //   "&:hover": {
        //     color: primaryLight,
        //     cursor: "pointer",
        //   },
        // }}
      >
        RideNow
      </Typography>
    </ButtonBase>
  );
};

export default LogoSection;
