import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          textTransform: "none",
          fontSize: "1.2rem",
          color: "gray",
          marginLeft: "10px",
        }}
        endIcon={
          <ArrowDropDownIcon
            style={{ fontSize: "1.7rem", marginLeft: "-4px" }}
          />
        }
      >
        Log in as
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <Link to="/login"> */}
        <Link to="/jobseeker">
          <MenuItem onClick={handleClose}>Job Seeker</MenuItem>
        </Link>
        {/* <Link to="/login"> */}
        <Link to="/company">
          <MenuItem onClick={handleClose}>Company</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
