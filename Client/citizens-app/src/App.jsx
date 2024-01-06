import "./App.css";
import { Box, FormControlLabel, Switch } from "@mui/material";
import Map from "./ui-components/MapContainer/Map";
import Drawer from "./ui-components/Drawer/Drawer";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import SearchBar from "./ui-components/Search/SearchBar";

/**
 * Custom Switch Style
 */
const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));


function App() {
  /**
   * useState
   */
  const [shape, setShape] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});
  const [reportSwitch, setReportSwitch] = useState(false);
  const [boardSwitch, setBoardSwitch] = useState(true);


  /**
   * @return {void}
   */
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  /**
   * @return {void}
   */
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  /**
   * @return {void}
   */
  const handleReportSwitchChange = () => {
    setReportSwitch(!reportSwitch);
    if (isDrawerOpen && shape === 2) {
      closeDrawer();
    } else {
      setShape(2);
      openDrawer();
    }
  }

  /**
   * @return {void}
   */
  const handleBoardSwitchChange = () =>{
    setBoardSwitch(!boardSwitch);
  }
  

  //Test
  console.log(isDrawerOpen);
  console.log("Drawer Content:", drawerContent);
  console.log("Shape: ", shape)

  return (
    <Box>
      <Map
        setShape={setShape}
        openDrawer={openDrawer}
        setDrawerContent={setDrawerContent}
        boardDisplayMode={boardSwitch}
      />
      <Drawer
        shape={shape}
        content={drawerContent}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        isDrawerOpen={isDrawerOpen}
      />
      {/* <Box position>
        <SearchBar/>
      </Box> */}
      <Box position='absolute' bgcolor={'rgba(255, 255, 255, 0.75)'} display="flex" flexDirection="row" width="100" margin="10px" paddingLeft="10px" bottom={0} right={0} borderRadius={2} zIndex='1000'>
        <FormControlLabel
          control={<CustomSwitch checked={boardSwitch} onChange={() => handleBoardSwitchChange()}  />}
          label="Bảng QC"
        />
        <FormControlLabel
          control={<CustomSwitch checked={reportSwitch} onChange={() => handleReportSwitchChange()} />}
          label="Báo cáo vi phạm"
        />
      </Box>
    </Box>
  );
}

export default App;
