import * as React from "react";
import { Link, useNavigate } from "react-router-dom";


import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Cookies from 'js-cookie';
interface BasicMenuProps {
  children: React.ReactNode;
}

export const MenuComponent: React.FC<BasicMenuProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };


  const logout = () => {
    Cookies.remove('token', { path: '/' })
    handleClose()
    navigate('/login')
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
        {children}
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
       
          <MenuItem onClick={logout}>
            <LogoutRoundedIcon className="mr-2" />
            Logout
          </MenuItem>

      </Menu>
    </div>
  );
};
