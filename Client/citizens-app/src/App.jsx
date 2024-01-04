import "./App.css";
import { Box } from "@mui/material";
import Map from "./ui-components/MapContainer/Map";
import Drawer from "./ui-components/Drawer/Drawer";
import { useState } from "react";

function App() {
  /**
   * useState
   */
  const [shape, setShape] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});

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

  //Test
  console.log(isDrawerOpen);
  console.log("Drawer Content:", drawerContent);

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
