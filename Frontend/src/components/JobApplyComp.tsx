import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";

import ProfAvatar from "../assets/profile-avatar.jpg";

interface TruncatedTextProps {
  text: string;
  maxLines?: number;
}

type MyFunc = () => void;

interface CustomizedDialogsProps {
  handleClose: MyFunc;
  open: boolean;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLines }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div
        className={`text-sm font-normal ${
          showMore ? "" : "line-clamp line-clamp-" + maxLines
        }`}
      >
        {text}
      </div>
      {!showMore && (
        <span
          className="text-blue-500 text-xs cursor-pointer"
          onClick={toggleShowMore}
        >
          See more
        </span>
      )}
      {showMore && (
        <span
          className="text-blue-500 text-xs cursor-pointer"
          onClick={toggleShowMore}
        >
          See less
        </span>
      )}
    </div>
  );
};

export const JobApplyComp: React.FC<CustomizedDialogsProps> = ({
  handleClose,
  open,
}) => {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Apply to this Job
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
        <DialogContent dividers style={{ width: "448px" }}>
          <div className="h-full w-full bg-gray-200 rounded p-3 flex flex-col">
            <div className="flex flex-row">
              <Avatar alt="Remy Sharp" src={ProfAvatar} />
              <div className="flex flex-col ml-3">
                <p className="text-xl font-medium">Job Title</p>
                <p className="font-sans text-sm font-normal">Job Category</p>
              </div>
              <p className="text-xs font-normal ml-auto pt-1">
                21 Jan 2024 07.28 PM
              </p>
            </div>
            <TruncatedText
              text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium quaerat ducimus ea alias quibusdam minima, necessitatibus dolore dolores unde! Provident.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium quaerat ducimus ea alias quibusdam minima, necessitatibus dolore dolores unde! Provident."
              maxLines={2}
            />
          </div>
          <p className="text-xl pt-5">Upload your CV here</p>
          <input
            type="file"
            style={{
              width: "100%",
              padding: 0,
              marginTop: "10px",
              marginBottom: "15px",
              background: "#475569",
              color: "#e2e8f0",
              fontSize: "13px",
              cursor: "pointer",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button autoFocus style={{ width: "100%" }} onClick={handleClose}>
            Apply
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
