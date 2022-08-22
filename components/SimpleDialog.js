import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useState, useEffect } from "react";
import axios from "axios";
import ReviewComponent from "./ReviewComponent";
import { Divider } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];
//Import Styling ===============================================================================
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};
function SimpleDialog(props) {
  //SET INITIAL STATES ==============================================================================

  const { onClose, selectedValue, open, allReviews } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  // reviewsList.map(
  //   r=>{
  //     return (
  //       <ReviewComponent review = {r}/>
  //     )
  //   }
  // )
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>All the reviews for LISTING</DialogTitle>

      <List sx={{ pt: 0 }}>
        {allReviews.map((r) => (
          <ListItem
            button
            onClick={() => handleListItemClick(r.content)}
            key={r._id}
          >
            <List sx={style} component="nav" aria-label="mailbox folders">
              <Typography variant="h7">{r.user}</Typography>
              <Typography variant="h6">{r.content}</Typography>
              <Typography variant="h8">{r.date}</Typography>
              <Divider />
            </List>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ allReviews }) {
  console.log("this is all reviews", allReviews);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        See All Reviews
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        allReviews={allReviews}
      />
    </div>
  );
}
