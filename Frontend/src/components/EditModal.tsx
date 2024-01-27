import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputLabel, Radio, RadioGroup } from '@mui/material';
import axios from "axios";
import { environment } from "../environment/environment";
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 10,
    p: 4,
    borderRadius: 2,
};


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



interface EditModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
}

const EditModal: React.FC<EditModalProps> = ({ item, open, setOpen }) => {
    const [opensnackbar, setOpensnackbar] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>(item);

    useEffect(() => {
        setUserData(item)
    }, [open])


    const [phnError, setphnError] = useState<String | null>('');


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpensnackbar(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.target.name;
        const value: string = event.target.value;

        setUserData((prevUserData) => {
            if (!prevUserData) {
                return {
                    Userdata: {
                        [name]: value,
                        username: '',
                        email: '',
                        first_name: '',
                        last_name: '',
                    },
                    JobseekerData: {
                        [name]: value,
                        address: '',
                        date_of_birth: '',
                        education: '',
                        gender: '',
                        phone_number: '',
                    },
                };
            }

            return {
                ...prevUserData,
                Userdata: {
                    ...prevUserData.Userdata,
                    [name]: value,
                },
                JobseekerData: prevUserData.JobseekerData
                    ? {
                        ...prevUserData.JobseekerData,
                        [name]: value,
                    }
                    : undefined,
            };
        });
    };

    function validatePhoneNumber(phoneNumber: string): boolean {
        const phnNoValidator: RegExp = /^(?:\d{10}|\d{2}-\d{7}|\d{3}-\d{6}|\d{2}-\d{3}-\d{4})$/;
        return phnNoValidator.test(phoneNumber);
    }

    function updateUser(): void {
        const token = Cookies.get('token')
        console.log(token)
        const url: string = environment.Base_Url + '/user/';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
               
            },
        };

        axios.put(url, userData, config)
            .then(function (response) {
                if (response.status == 200) {
                    setOpensnackbar(true);
                    setOpen(false)
                    console.log(response);
                }

            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });
    }


    useEffect(() => {
        setTimeout(() => {
            setphnError('')

        }, 1500)
    }, [phnError])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const validatephnNumber: boolean = validatePhoneNumber(userData.JobseekerData?.phone_number || '');
        if (validatephnNumber) {
            updateUser()
        } else {
            if (!validatephnNumber) {
                setphnError("in phn no")
            }
        }


    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ fontSize: 25, fontWeight: 500, flexDirection: "row", display: "flex", width: "100%", marginTop: 25 }}>
                        Edit details
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ flexDirection: "row", display: "flex", width: "100%", marginTop: 25 }}>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">firstname</InputLabel>
                                    <Input
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.Userdata?.first_name}
                                        name="first_name"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </div>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">lastname</InputLabel>
                                    <Input
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.Userdata?.last_name}
                                        name="last_name"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div style={{ flexDirection: "row", display: "flex", width: "100%", marginTop: 25 }}>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Username</InputLabel>
                                    <Input
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.Userdata?.username}
                                        name="username"
                                        onChange={handleChange}
                                        required

                                    />
                                </FormControl>
                            </div>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">email</InputLabel>
                                    <Input
                                        type='email'
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.Userdata?.email}
                                        name="email"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div style={{ flexDirection: "row", display: "flex", width: "100%", marginTop: 25 }}>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Address</InputLabel>
                                    <Input id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.JobseekerData?.address}
                                        name="address"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </div>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Education</InputLabel>
                                    <Input id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.JobseekerData?.education}
                                        name="education"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div style={{ flexDirection: "row", display: "flex", width: "100%", marginTop: 25 }}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Gender
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    onChange={handleChange}
                                    value={userData?.JobseekerData?.gender}


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
                        </div>
                        <div style={{ flexDirection: "row", display: "flex", width: "100%", marginTop: 25 }}>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Birthday</InputLabel>
                                    <Input
                                        type='date'
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.JobseekerData?.date_of_birth}
                                        name="date_of_birth"
                                        onChange={handleChange}
                                        required
                                    />
                                    <FormHelperText style={{ color: "red" }} id="my-helper-text">{phnError}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <div style={{ flexDirection: "row", display: "flex", width: "100%", marginTop: 25 }}>
                            <div style={{ flex: 1 }}>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">phone number</InputLabel>
                                    <Input
                                        type='number'
                                        id="my-input"
                                        aria-describedby="my-helper-text"
                                        value={userData?.JobseekerData?.phone_number}
                                        name="phone_number"
                                        onChange={handleChange}
                                        required
                                    />
                                    <FormHelperText style={{ color: "red" }} id="my-helper-text">{phnError}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>

                        <div style={{ flexDirection: "row", display: "flex", width: "100%", marginTop: 40, alignItems: "center", justifyContent: "flex-end", gap: 25 }}>
                            <div>
                                <Button style={{ backgroundColor: "gray" }} variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                            </div>
                            <div>
                                <Button type='submit' variant="contained">Update</Button>
                            </div>
                        </div>
                    </form>

                </Box>
            </Modal>
            <Snackbar open={opensnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Success fully Updated
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditModal;
