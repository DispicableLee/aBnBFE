import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import ReviewComponent from "../components/ReviewComponent"

export default function Listing(property) {
    // const { user, error, isLoading } = useUser();
//==================================================================================================================
const [image, setImage] = useState("")
const [owner, setOwner] = useState("")
const [listingName, setListingName] = useState("")
const [location, setLocation] = useState("")
const [description, setDescription] = useState("")
const [amenities, setAmenities] = useState([])
const [reviews, setReviews] = useState([])
//================================================================================================================
useEffect(() => {
const getListing = async()=>{
    const listingRes = await axios.get(`http://localhost:5002/api/v1/airbnb/search/single/62dbfa9c876bee396a7e538b`)
    const listObject = listingRes.data;
    console.log(listObject);
//===========================================================================================================================
    setImage(listObject.images[0])
    setOwner(listObject.owner)
    setListingName(listObject.listing_name)
    setLocation(listObject.location)
    setDescription(listObject.description)
    setAmenities(listObject.amenities)
    setReviews(listObject.reviews)
  }
getListing();
}, []);
//===========================================================================================================
    return (
      <div>
        <h1>this is the listing page</h1>
        <a href="/api/auth/logout">Logout</a>

        <Card sx={{ maxWidth: 1000 }}>
      <CardMedia
        component="img"
        height="750"
        width="750"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant='h6'>
          {owner}
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          {listingName}
        </Typography>
        <Typography>
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardContent>
        {amenities}
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
      <ReviewComponent
        
      />
    </Card>

      </div>
    );
  }