import "./App.css";
import { Box } from "@mui/material";
import Map from "./ui-components/MapContainer/Map";
import Drawer from "./ui-components/Drawer/Drawer";
import { useState, useSyncExternalStore } from "react";
import ReportModal from "./ui-components/Modal/ReportModal";
import AdsDetailModal from "./ui-components/Modal/AdsDetailModal";

function App() {
  const [shape, setShape] = useState(0);
  const [locationInfo, setLocationInfo] = useState({});
  const [adsPanelList, setAdsPanelList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});

  // const [reportContent, setReportContent] = useState({});
  // const [adsDetailContent, setAdsDetailContent] = useState({});
  // const [adsDetailModalOpen, setAdsDetailModalOpen] = useState(false);
  // const [reportModalOpen, setReportModalOpen] = useState(false);

  console.log(isDrawerOpen);

  // const openAdsDetailModal = () => {
  //   setReportModalOpen(false);
  //   setAdsDetailModalOpen(true);
  // };

  // const openReportModal = () => {
  //   setAdsDetailModalOpen(false);
  //   setReportModalOpen(true);
  // };

  // const closeModal = () => {
  //   setAdsDetailModalOpen(false);
  //   setReportModalOpen(false);
  // };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <Box>
      <Map setShape={setShape} openDrawer={openDrawer} />
      <Drawer
        shape={shape}
        content={drawerContent}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        isDrawerOpen={isDrawerOpen}
      />
      {/* <ReportModal
        content={reportContent}
        openReportModal={openReportModal}
        closeModal={closeModal}
        isModalOpen={reportModalOpen}
      />
      <AdsDetailModal
        content={adsDetailContent}
        openAdsDetailModal={openAdsDetailModal}
        closeModal={closeModal}
        isModalOpen={adsDetailModalOpen}
      /> */}
    </Box>
  );
}

export default App;
