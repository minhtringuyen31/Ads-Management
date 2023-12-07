import "./App.css";
import { Box } from "@mui/material";
import Map from "./ui-components/MapContainer/Map";
import Drawer from "./ui-components/Drawer/Drawer";
import { useState } from "react";

function App() {
  const [shape, setShape] = useState(0);
  const [locationInfo, setLocationInfo] = useState({});
  const [adsPanelList, setAdsPanelList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [content, setContent] = useState({});
  console.log(isDrawerOpen);

  const openDrawer = () => {
    setisDrawerOpen(true);
  };

  const closeDrawer = () => {
    setisDrawerOpen(false);
  };
  return (
    <Box>
      <Map setShape={setShape} openDrawer={openDrawer} />
      <Drawer
        shape={shape}
        content={content}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        isDrawerOpen={isDrawerOpen}
      />
    </Box>
  );
}

export default App;
