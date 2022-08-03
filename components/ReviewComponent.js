import * as React from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import {useState, useEffect} from "react";
//STYLE===============================================================================================
const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};
//====================================================================================================
export default function ReviewComponent(props) {
    //SET STATE====================================================================================
    const [reviewList, setReviewList] = useState([]);
    //SET MAPPING=================================================================================
    
    useEffect(()=>{
        const getReviews= async()=>{
            const revReqs = await axios.get(`http://localhost:5002/api/v1/airbnb/search/all/reviews/62dbfa9c876bee396a7e538b`)
            const revData = revReqs.data;
            const newList = []
            for(var i = 0;i<revData.length;i++){
                let revCon = revData[i];
                newList.unshift(revCon);
            }
            setReviewList(newList)
            console.log(reviewList);
        }
        getReviews();
    },[])
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
        <Typography variant='h7'>
            {reviewList[0].user}
        </Typography>
        <Typography variant='h6'>
            {reviewList[0].content}
        </Typography>
        <Typography variant='h8'>
            {reviewList[0].date}
        </Typography>
      <Divider />

    </List>
  );
}
