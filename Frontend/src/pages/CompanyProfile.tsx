import { Link } from "react-router-dom";
import Logo from "../assets/dummy-logo.png";
import ProfAvatar from "../assets/profile-avatar.jpg";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import MenuComponent from "../components/MenuComponent";

export default function CompanyProfile() {
  return (
    <>
      <div className="relative bg-neutral-200 h-screen pb-24 pt-14 flex flex-col justify-center">
        <div className="menu-bar w-full h-14 bg-slate-50 flex flex-row fixed top-0 left-0 justify-between px-20">
          <Link to="/">
            <img src={Logo} alt="dummy-logo" style={{ height: 50 }} />
          </Link>
          <div className="avatar my-auto flex flex-row">
            <Avatar alt="Remy Sharp" src={ProfAvatar} />
            <MenuComponent />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Logo} alt="dummy-logo" style={{ width: "70%" }} />
        </div>
        <p className="font-sans text-center text-4xl font-medium">
          Company Profile
        </p>
        <p className="text-center text-2xl font-medium text-blue-600 mt-4">
          Sign up today
        </p>
      </div>
    </>
  );
}
