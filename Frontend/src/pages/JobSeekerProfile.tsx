import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/dummy-logo.png";
import ProfAvatar from "../assets/profile-avatar.jpg";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Grid from "@mui/material/Grid";
import { MenuComponent } from "../components/JobSeekerMenuComp";
import RightDrawerComp from "../components/RightDrawerComp";
import { NotificationsComp } from "../components/NotificationComp";
import SearchBar from "../components/SearchBar";
import SideTabs from "../components/SideTabs";
import Divider from "@mui/material/Divider";
import { environment } from "../environment/environment";
import axios from "axios";
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import EditModal from "../components/EditModal";


interface UserData {
  Userdata: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;

  };

  JobseekerData?: {
    address: string;
    date_of_birth: string;
    education: string;
    gender: string;
    phone_number: string;

  }
  // other properties...
}

export default function JobSeekerProfile() {
  const [badgeContent, setBadgeContent] = useState<number>(0);
  const [notifiDrawer, setNotifiDrawer] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [open, setOpen] = useState<boolean>(false);



  useEffect(() => {
    getUserDetails()
  }, [open])


  const getUserDetails = () => {
    const loginUrl = `${environment.Base_Url}/user/`;
    const token = Cookies.get('token')
    console.warn(token)
    axios.get(loginUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {

        if (response.status = 200) {
          setUserData(response.data)
          console.log(response.data)
        }

      })
      .catch((error) => {
        console.error("Login error:", error)
      });
  };


  const handleNotifiOpen = () => {
    setNotifiDrawer(true);
  };

  const handleNotifiClose = () => {
    setNotifiDrawer(false);
  };

  return (
    <>
      <div className="relative bg-neutral-200 h-screen pt-14 flex flex-col justify-center">
        <div className="menu-bar w-full h-14 bg-slate-50 flex flex-row fixed top-0 left-0 justify-between px-20">
          <Link to="/">
            <img src={Logo} alt="dummy-logo" style={{ height: 50 }} />
          </Link>
          <SearchBar />
          <div className="avatar my-auto flex flex-row">
            <Badge
              color="primary"
              badgeContent={badgeContent}
              className={
                badgeContent > 0
                  ? "my-auto mr-6 text-xl"
                  : "my-auto mr-3 text-xl"
              }
            >
              <NotificationsRoundedIcon
                className="text-gray-500"
                onClick={() => {
                  handleNotifiOpen();
                }}
              />
            </Badge>
            <Avatar alt="Remy Sharp" src={ProfAvatar} />
            <MenuComponent>username</MenuComponent>
            <RightDrawerComp
              openDrawer={notifiDrawer}
              handleClose={handleNotifiClose}
            >
              <NotificationsComp>
                Click the close icon to see the Collapse transition in action!
              </NotificationsComp>
              <NotificationsComp>
                Click the close icon to see the Collapse transition in action!
              </NotificationsComp>
            </RightDrawerComp>
          </div>
        </div>
        <Grid container spacing={0} className="h-full rounded">
          <Grid
            item
            xs={12}
            md={9}
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              padding: "16px",
            }}
          >
            <div className="h-full w-full bg-white rounded">
              <SideTabs />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            className="px-5"
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{ padding: "16px", paddingLeft: "0px" }}
          >
            <div className="h-full py-8 px-5 w-full bg-gray-50 rounded flex flex-col items-center">
              <Avatar
                alt="Remy Sharp"
                src={ProfAvatar}
                style={{ width: "50%", height: "auto" }}
              />
              <p className="text-2xl font-semibold mt-1">{userData?.Userdata?.username} </p>
              <p className="text-xl text-center font-light">{userData?.Userdata?.first_name}</p>
              <p className="text-xl text-center font-light">{userData?.Userdata?.last_name}</p>
              <p className="text-sm text-center font-normal mt-2">
                {userData?.Userdata?.email}
              </p>

              <div className="gender w-full flex flex-row">
                <p className="text-md font-semibold mt-1">Gender</p>
                <p className="text-md text-gray-600 font-normal mt-1 ml-auto">
                  {userData?.JobseekerData?.gender == 'M' ? "Male" : "Female"}
                </p>
              </div>
              <div className="phone w-full flex flex-row">
                <p className="text-md font-semibold mt-1">Phone</p>
                <p className="text-md text-gray-600 font-normal mt-1 ml-auto">
                  {userData?.JobseekerData?.phone_number}
                </p>
              </div>
              <div className="address w-full flex flex-row">
                <p className="text-md font-semibold mt-auto ">Address</p>
                <div className="ml-auto">
                  <p className="text-md text-gray-600 font-normal mt-2 ">
                    {userData?.JobseekerData?.address}
                  </p>

                </div>
              </div>
              <Divider
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "20px",
                }}
              />
              <div className="education w-full flex flex-col">
                <p className="text-xl font-semibold mb-2 mt-1">Education</p>
                <p className="text-md text-justify text-gray-600 font-normal mt-1">
                  {userData?.JobseekerData?.education}
                </p>
              </div>
              <div style={{ marginTop: 40 }}><Button variant="contained" onClick={() => setOpen(true)}>Edit</Button></div>
            </div>
          </Grid>
        </Grid>
      </div>

      <EditModal item={userData} open={open} setOpen={setOpen} />
    </>
  );
}
