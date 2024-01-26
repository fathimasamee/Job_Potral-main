import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type MyFunc = () => void;

interface TemporaryDrawerProps {
  children: React.ReactNode;
  handleClose: MyFunc;
  openDrawer: boolean;
}

const RightDrawerComp: React.FC<TemporaryDrawerProps> = ({
  children,
  openDrawer,
  handleClose,
}) => {
  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      handleClose();
    };

  const list = () => (
    <Box
      sx={{ width: 300, padding: "10px 20px 10px 20px" }}
      role="presentation"
      //   onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <div style={{ marginBottom: "20px" }}>
        <p
          className="text-md font-normal"
          style={{
            marginTop: "6px",
            color: "gray",
          }}
        >
          Notifications
        </p>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {/* <Divider style={{ width: "100%", marginTop: "50px" }} /> */}
      {children}
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </div>
  );
};

export default RightDrawerComp;
