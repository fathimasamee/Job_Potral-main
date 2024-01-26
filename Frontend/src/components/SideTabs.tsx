import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import DomainVerificationRoundedIcon from "@mui/icons-material/DomainVerificationRounded";
import FeedTabPlane from "./FeedTabPlane";
import ApplicationTabPlane from "./ApplicationTabPlane";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        width: "100%",
        borderRadius: "50px",
      }}
    >
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          "& .Mui-selected": {
            backgroundColor: "#f1f5f9",
          },
        }}
      >
        <Tab icon={<DynamicFeedRoundedIcon />} label="Feed" {...a11yProps(0)} />
        <Tab
          icon={<DomainVerificationRoundedIcon />}
          label="Application"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FeedTabPlane
          handleFunc={() => {
            console.log("Feed!!");
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ApplicationTabPlane
          handleFunc={() => {
            console.log("Application!!");
          }}
        />
      </TabPanel>
    </Box>
  );
}
