import * as React from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { accordionSummaryClasses, Typography } from '@mui/material';
import {useState, useEffect} from "react";
import AlertDialog from './AlertDialog';
//STYLE===============================================================================================
const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};
//====================================================================================================
export default function ReviewComponent({review}) {
  console.log(review)
  return (
    <div>
      <List sx={style} component="nav" aria-label="mailbox folders">
            <Typography variant='h7'>
                {review.user}
            </Typography>
            <Typography variant='h6'>
                {review.content}
            </Typography>
            <Typography variant='h8'>
                {review.date}
            </Typography>
          <Divider />
        <AlertDialog
          username = {review.user}
          content = {review.content}
        />
      </List> 
  
    </div>
  );
}
