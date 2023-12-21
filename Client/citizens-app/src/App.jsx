import "./App.css";
import { Box } from "@mui/material";
import Map from "./ui-components/MapContainer/Map";
import Drawer from "./ui-components/Drawer/Drawer";
import { useState } from "react";
import ReportModal from "./ui-components/Modal/ReportModal";
import AdsDetailModal from "./ui-components/Modal/AdsDetailModal";

function App() {
  const [shape, setShape] = useState(0);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});

  console.log(isDrawerOpen);
  console.log("Drawer Content:", drawerContent);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <Box>
      <Map
        setShape={setShape}
        openDrawer={openDrawer}
        setDrawerContent={setDrawerContent}
      />
      <Drawer
        shape={shape}
        content={drawerContent}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        isDrawerOpen={isDrawerOpen}
      />
    </Box>
  );
}

export default App;
