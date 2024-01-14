import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { ButtonBase, Typography } from "@mui/material";

// project imports
import config from "config";
import Logo from "./Logo";
import { MENU_OPEN } from "store/actions";
import { useTheme } from "@mui/material/styles";
import { GetUser } from "store/auth/auth-config";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  // const defaultId = useSelector((state) => state.customization.defaultId);
  const theme = useTheme();
  const defaultId = 1;
  const dispatch = useDispatch();
  const role = GetUser().userRole;

  const renderLogo = (role) => {
    switch (role) {
      case "province_officer":
        return "Cán bộ Sở";
      case "district_officer":
        return "Cán bộ Quận";
      case "ward_officer":
        return "Cán bộ Phường";
      default:
        return "";
    }
  };
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
        {renderLogo(role)}
      </Typography>
    </ButtonBase>
  );
};

export default LogoSection;
