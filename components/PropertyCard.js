import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const PropertyCard = (props) => {
    useEffect(()=>{
        console.log("this is the propert card")
    },[]);
    return(
        <div>

        </div>
    )
}

export default PropertyCard;