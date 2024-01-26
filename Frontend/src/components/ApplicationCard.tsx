import { useState } from "react";

import Avatar from "@mui/material/Avatar";

import ProfAvatar from "../assets/profile-avatar.jpg";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type MyFunc = () => void;

interface CardProps {
  companyName: String;
  handleDecline: MyFunc;
  handleAccept: MyFunc;
  handleClose: MyFunc;
}

const ApplicationCard: React.FC<CardProps> = ({
  companyName,
  handleAccept,
  handleDecline,
  handleClose,
}) => {
  return (
    <div className="relative h-full w-full bg-gray-200 rounded p-3 flex flex-col">
      <div className="flex flex-row">
        <Avatar alt="Remy Sharp" src={ProfAvatar} />
        <div className="flex flex-col ml-3">
          <p className="text-xl font-medium">Job Title</p>
          <p className="text-xs font-normal ml-auto pt-1">
            21 Jan 2024 07.28 PM
          </p>
        </div>
        <p className="font-sans text-sm font-normal">Job Category</p>
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
      <div className="bottom flex flex-row">
        <p
          className="text-normal"
          style={{
            paddingTop: "9px",
          }}
        >
          @{companyName}
        </p>
        <div
          className="btn-bottom flex flex-row"
          style={{
            marginLeft: "auto",
            paddingTop: "8px",
          }}
        >
          <Button
            style={{
              marginRight: "3px",
              textTransform: "none",
              fontSize: "0.8rem",
            }}
            variant="outlined"
            size="small"
            onClick={handleAccept}
          >
            Apply now
          </Button>
          <Button
            style={{
              textTransform: "none",
              fontSize: "0.8rem",
            }}
            variant="outlined"
            size="small"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
