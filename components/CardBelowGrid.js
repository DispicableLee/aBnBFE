import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

export default function MultiActionAreaCard() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const checkAuthentication = ()=>{
        if(user){
          router.push("/listing")
        }else{
          router.push("/api/auth/login")
        }
      }
  return (
    <Box pl={6} pt={7}>
      <Card sx={{ maxWidth: 1750 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="600"
            width="300"
            image="https://i.pinimg.com/originals/05/42/e8/0542e8711844290581fb48bf57f41242.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              Come Join Us!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Host your own listing Now! It's Free!</strong>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            onClick={()=>{checkAuthentication()}}
              style={{
                borderRadius: 35,
                color: "#ff8a8a",
                padding: "18px 36px",
                fontSize: "18px"
            }}
          size="large" >
            Sign In
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
