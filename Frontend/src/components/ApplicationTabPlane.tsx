import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";

import BannerImage1 from "../assets/banner-image1.jpg";
import BannerImage2 from "../assets/banner-image2.png";
import BannerImage3 from "../assets/banner-image3.jpg";
import ApplicationCard from "./ApplicationCard";
import Divider from "@mui/material/Divider";

type MyFunc = () => void;

interface TemporaryDrawerProps {
  handleFunc: MyFunc;
}

const ApplicationTabPlane: React.FC<TemporaryDrawerProps> = ({
  handleFunc,
}) => {
  return (
    <>
      <div className="top w-full flex flex-row-reverse">
        <Button
          autoFocus
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "16px",
            textTransform: "none",
          }}
          endIcon={<CachedRoundedIcon />}
          onClick={handleFunc}
        >
          Refresh
        </Button>
      </div>
      <p style={{ paddingLeft: "16px" }}>
        <TaskAltRoundedIcon
          style={{ fontSize: "20px", marginRight: "5px", marginBottom: "5px" }}
        />
        Selected
      </p>
      <div className="w-full h-full">
        <Grid container spacing={0} className="w-full">
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              padding: "16px",
            }}
          >
            <ApplicationCard
              companyName="Company Name 1"
              handleAccept={() => {
                console.log("Accept");
              }}
              handleDecline={() => {
                console.log("Decline");
              }}
              handleClose={() => {
                console.log("Close");
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              padding: "16px",
            }}
          >
            <ApplicationCard
              companyName="Company Name 2"
              handleAccept={() => {
                console.log("Accept");
              }}
              handleDecline={() => {
                console.log("Decline");
              }}
              handleClose={() => {
                console.log("Close");
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Divider
        style={{ width: "100%", marginTop: "15px", marginBottom: "20px" }}
      />
      <p style={{ paddingLeft: "16px" }}>
        <HourglassBottomRoundedIcon
          style={{ fontSize: "20px", marginRight: "5px", marginBottom: "5px" }}
        />
        Waiting
      </p>
      <div className="w-full h-full">
        <Grid container spacing={0} className="w-full">
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              padding: "16px",
            }}
          >
            <ApplicationCard
              companyName="Company Name 1"
              handleAccept={() => {
                console.log("Accept");
              }}
              handleDecline={() => {
                console.log("Decline");
              }}
              handleClose={() => {
                console.log("Close");
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              padding: "16px",
            }}
          >
            <ApplicationCard
              companyName="Company Name 2"
              handleAccept={() => {
                console.log("Accept");
              }}
              handleDecline={() => {
                console.log("Decline");
              }}
              handleClose={() => {
                console.log("Close");
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              padding: "16px",
            }}
          >
            <ApplicationCard
              companyName="Company Name 2"
              handleAccept={() => {
                console.log("Accept");
              }}
              handleDecline={() => {
                console.log("Decline");
              }}
              handleClose={() => {
                console.log("Close");
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              padding: "16px",
            }}
          >
            <ApplicationCard
              companyName="Company Name 2"
              handleAccept={() => {
                console.log("Accept");
              }}
              handleDecline={() => {
                console.log("Decline");
              }}
              handleClose={() => {
                console.log("Close");
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ApplicationTabPlane;
