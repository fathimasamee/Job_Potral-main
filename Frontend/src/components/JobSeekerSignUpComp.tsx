import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from 'axios';
import { collapseClasses } from "@mui/material";
import { environment } from "../environment/environment";
// import { useHistory } from 'react-router-dom';




type MyFunc = () => void;

interface CustomizedDialogsProps {
  handleClose: MyFunc;
  open: boolean;
}

interface InputState {
  [key: string]: string;
}

interface User {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
}

interface JobSeeker {
  gender: string | undefined;
  date_of_birth: string | undefined;
  phone_number: string | undefined;
  education: string | undefined;
  address: string | undefined;
}

interface RegistrationData {
  user: User;
  job_seeker: JobSeeker;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const JobSeekerSignUpComp: React.FC<CustomizedDialogsProps> = ({
  handleClose,
  open,
}) => {
  // const history = useHistory();
  const [value, setValue] = useState<Date | null>(new Date());
  const [inputs, setInputs] = useState<InputState | null>({});
  const [passError, setpassError] = useState<String | null>('');
  const [phnError, setphnError] = useState<String | null>('');
  const [genderError, setgenderError] = useState<String | null>('');
  const [dateError, setdateError] = useState<String | null>('');


  function validatePhoneNumber(phoneNumber: string): boolean {
    const phnNoValidator: RegExp = /^(?:\d{10}|\d{2}-\d{7}|\d{3}-\d{6}|\d{2}-\d{3}-\d{4})$/;
    return phnNoValidator.test(phoneNumber);
  }

  function passwordValidation(pass: string): boolean {
    const passwordValidator: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordValidator.test(pass);
  }

  useEffect(() => {
    setTimeout(() => {
      setpassError('')
      setphnError('')
      setgenderError('')
    }, 1500)
  }, [passError, phnError, genderError])



  function RegisterJobSeeker(): void {
    

    const url: string = environment.Base_Url + '/api/register/';
    const data: RegistrationData = {
      user: {
        username: inputs?.username,
        password: inputs?.password,
        email: inputs?.email,
      },
      job_seeker: {
        gender: inputs?.gender,
        date_of_birth: inputs?.date_of_birth,
        phone_number: inputs?.phone_number,
        education: inputs?.education,
        address: inputs?.address,
      },
    };



    axios.post(url, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {

    });
}



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value: string = event.target.value;

    setInputs((prevValues: InputState | null) => {
      if (!prevValues) {
        return { [name]: value };
      }

      return { ...prevValues, [name]: value };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validatePassword: boolean = passwordValidation(inputs?.password || '');
    const validatephnNumber: boolean = validatePhoneNumber(inputs?.phone_number || '');
    const validateGender: boolean = inputs?.gender ? true : false;



    if (validatePassword && validatephnNumber && validateGender && inputs?.date_of_birth != null) {
      RegisterJobSeeker();
    } else {
      if (!validatePassword) {
        setpassError("password")

      } else if (!validatephnNumber) {

        setphnError("in phn no")
      } else if (!validateGender) {

        setgenderError("reqouishdjbf")
      } else if (inputs?.date_of_birth == null) {

        setgenderError("reqouishdjbf")
      }
    }


  };


  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Sign Up As Job Seeker
        </DialogTitle>
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
        <form onSubmit={handleSubmit}>
          <DialogContent dividers style={{ width: "448px" }}>

            <div style={{ width: "416px" }}>
              <TextField
                id="outlined-basic"
                label="Firstname"
                variant="outlined"
                size="small"
                name="first_name"
                style={{
                  width: "208px",
                  paddingBottom: "10px",
                  paddingRight: "10px",
                }}
                onChange={handleChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Lastname"
                variant="outlined"
                size="small"
                name="last_name"
                style={{ width: "208px", paddingBottom: "10px" }}
                onChange={handleChange}
                required
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              size="small"
              name="username"
              style={{ width: "416px", paddingBottom: "10px" }}

              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              name="email"
              type="email"
              style={{ width: "416px", paddingBottom: "10px" }}
              onChange={handleChange}
              required
            />
            <div style={{ width: "416px" }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  onChange={handleChange}


                >
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <p style={{ color: "red" }}>{genderError}</p>
            </div>
            <input
              type="date"
              name="date_of_birth"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Telephone"
              variant="outlined"
              size="small"
              name="phone_number"
              style={{ width: "416px", paddingBottom: "10px" }}
              onChange={handleChange}
              required

            />
            <p style={{ color: "red" }}>{phnError}</p>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              name="password"
              style={{ width: "416px", paddingBottom: "10px" }}
              onChange={handleChange}
              required
            />
            <p style={{ color: "red" }}>{passError}</p>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              size="small"
              name="address"
              style={{ width: "416px", paddingBottom: "10px" }}
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Education"
              variant="outlined"
              size="small"
              name="education"
              style={{ width: "416px", paddingBottom: "10px" }}
              onChange={handleChange}
              required
            />


          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus style={{ width: "100%" }}>
              Sign up
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};
