import * as React from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { accordionSummaryClasses, Typography } from '@mui/material';
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
    const [review, setReview] = useState(null)
    //SET MAPPING=================================================================================
    
    useEffect(()=>{
        const getReviews= async()=>{
            const revReqs = await axios.get(`http://localhost:5002/api/v1/airbnb/search/all/reviews/62dbfa9c876bee396a7e538b`)
            const revData = revReqs.data;
            var resultList = [];
            for (var i = 0; i < revData.length; i++) {
              var review = revData[i];
              var userId = revData[i].user;
              // call api that gets me the user given the user id 
              var userDoc = await axios.get(`http://localhost:5002/api/v1/airbnb/search/user/${userId}`)
              var userDocRes = userDoc.data;
              var mergedRes = {
                ...review,
                ...userDocRes
              }
              console.log("merged res", mergedRes)
              resultList.unshift(mergedRes)
              setReview(mergedRes)
            }
            setReviewList(resultList)
        }
        getReviews();
    },[])
  return (
    <div>
    {
      review && <List sx={style} component="nav" aria-label="mailbox folders">
            <Typography variant='h7'>
                {review.username}
            </Typography>
            <Typography variant='h6'>
                {review.content}
            </Typography>
            <Typography variant='h8'>
                {review.date}
            </Typography>
          <Divider />

        </List>
    }
    </div>
  );
}
