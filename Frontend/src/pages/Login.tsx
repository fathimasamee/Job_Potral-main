import { useState } from "react";
import { Link as DomLink } from "react-router-dom";
import Logo from "../assets/dummy-logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { environment } from "../environment/environment";
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const [inputs, setInputs] = useState<InputState | null>({});
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


  const handleLogin = () => {
    const loginUrl = `${environment.Base_Url}/login`;
    console.log("Login URL:", loginUrl);
    ;
    axios.post(loginUrl, {
      username: username,
      password: password,

    })
      .then((response) => {
        if (response.status = 200) {
          Cookies.set('token', response.data.token, { expires: 7, path: '/' })
          navigate('/jobseeker')
        } else {
          setLoginError("Invalid username or password");
        }

      })
      .catch((error) => {

        setLoginError("Invalid username or password");
        console.error("Login error:", error);
      });
  };



  return (
    <div className="relative bg-neutral-200 h-screen pt-14 flex flex-row justify-start">
      <div className="menu-bar w-full h-14 bg-slate-50 flex flex-row fixed top-0 left-0 justify-between px-20">
        <DomLink to="/">
          <img src={Logo} alt="dummy-logo" style={{ height: 50 }} />
        </DomLink>
      </div>
      <div className="left-side h-full w-3/5 flex flex-col justify-center">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Logo} alt="dummy-logo" style={{ width: "75%" }} />
        </div>
        <p className="font-sans text-center text-3xl font-normal w-3/5 mx-auto">
          Unleash your potential, embrace the extraodinary test
        </p>
      </div>
      <div className="right-side bg-zinc-500 w-2/5 py-16 flex flex-col justify-center items-center">
        {/* <Alert
          className="w-4/5 mb-3"
          sx={{ bgcolor: "#4ade80" }}
          variant="filled"
          severity="success" //info, warning, error
        >
          This is a filled success Alert.
        </Alert> */}
        <div className="login-box bg-white shadow-md w-4/5 h-full flex flex-col items-center py-5 px-7 rounded">
          <p className="text-center text-4xl font-medium mb-10">Log in</p>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            size="small"
            style={{ width: "100%", paddingBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            size="small"
            style={{ width: "100%", paddingBottom: "40px" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : undefined}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {loginError && (
            <p style={{ color: "red", marginBottom: "10px" }}>{loginError}</p>
          )}

          <Button
            autoFocus
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              width: "100%",
              marginBottom: "20px",
            }}
            onClick={handleLogin}
          >
            login
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Forgotten password?
          </Link>
          <div
            style={{ width: "100%", marginTop: "auto", marginBottom: "20px" }}
          >
            <Divider style={{ width: "100%", marginTop: "15px" }} />
            <Button
              variant="outlined"
              autoFocus
              style={{
                width: "100%",
                marginTop: "30px",
              }}
              onClick={() => {
                navigate('/')
              }}
            >
              Create new Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
