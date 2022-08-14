import React, { useEffect, useState } from "react";
import axios from "axios"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

const PropertyCard = (props) => {
    const [review, setReview] = useState({});
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState(null)
    const { user, error, isLoading } = useUser();
    const router = useRouter();
  useEffect(() => {
    const getReview = async()=>{
        const revReq = await axios.get(`http://localhost:5002/api/v1/airbnb/search/all/reviews/${props.property._id}`)
        console.log(revReq.data);
        var ratingTotal = 0
        var ratingJson = {};
        for(var i = 0;i<revReq.data.length;i++){
            if(revReq.data[i]!=null){
                ratingTotal = ratingTotal + revReq.data[i].rating;
                ratingJson = revReq.data[i];
            }
        }

        console.log(ratingTotal);
        console.log(ratingJson);
        setReview(ratingJson);
        setRating(ratingTotal);
        const userid = ratingJson.user;
        const userResponse = await axios.get(`http://localhost:5002/api/v1/airbnb/search/user/${userid}`)
        console.log(userResponse.data.username)
        setUsername(userResponse.data.username)

    }
    getReview();
  }, []);
  //====================================================================================================================
  const checkAuthentication = ()=>{
    if(user){
      var propertyId = String(props.property._id);
      localStorage.setItem("propertyId", propertyId)
      router.push("/listing")
    }else{
      router.push("/api/auth/login")
    }
  }
  //======================================================================================================================
  return (
    <Box pl={5} pt={5}>
      <Card sx={{ maxWidth: 550 }}>
        <CardActionArea onClick={()=>{checkAuthentication()}}>
          <CardMedia>
            <img src={props.property.images[0]} width="550px" height="300px" />
          </CardMedia>
          <Rating
                        precision={0.5}
                        name="simple-controlled"
                        value={rating}
                        readOnly
                    />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.property.listing_name}
            </Typography>
            <Typography>

            </Typography>
            <Typography variant="body1" color="text.secondary">
              {props.property.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              "{review.content}"
            </Typography>
            <strong>{username}</strong>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default PropertyCard;
