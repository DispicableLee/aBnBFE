//===================================== Import Dependancies ===============================================
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect, Fragment, useRef } from "react";
import ReviewComponent from "../components/ReviewComponent";
import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import PetsIcon from "@mui/icons-material/Pets";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SailingIcon from "@mui/icons-material/Sailing";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import SimpleDialog from "../components/SimpleDialog";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useUser } from '@auth0/nextjs-auth0';
//=================================================================================================================
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
//=====================================================================================================================
export default function Listing(property) {
//==================================================================================================================
  const [image, setImage] = useState("");
  const [owner, setOwner] = useState("");
  const [listingName, setListingName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [revCount, setRevCount] = useState(0);
  const [ratingScore, setRatingScore] = useState(0);
  const [reviewsList, setReviewsList] = useState([]);
  const [review, setReview] = useState(null);
  const [content, setContent] = useState("placeholder");
  const [reviewJson, setReviewJson] = useState(null)
  const [propertyId, setPropertyId] = useState("placeholder");
  const contentRef = useRef();
  const ratingRef = useRef();
  const classes = useStyles();
  const { user, error, isLoading } = useUser();
  //================================================================================================================
  useEffect(() => {
    var propertyId = localStorage.getItem("propertyId");
    setPropertyId(propertyId)
    console.log("this is property id in listing", propertyId);
    const getListing = async () => {
      const listingRes = await axios.get(
        `http://localhost:5002/api/v1/airbnb/search/single/${propertyId}`
      );
      const listObject = listingRes.data;
      console.log(listObject);
      //======================================================= Setting States ===================================================
      setImage(listObject.images[0]);
      console.log(image);
      setOwner(listObject.owner);
      console.log("owner:" ,owner);
      setListingName(listObject.listing_name);
      console.log(listingName);
      setLocation(listObject.location);
      console.log(location);
      setDescription(listObject.description);
      console.log(description);
      setAmenities(listObject.amenities);
      console.log(amenities);
      setReviews(listObject.reviews);
      console.log(reviews);
      setRevCount(listObject.reviews.length);
    };
    //===========================================================================================================================
    getListing();
    const getReviews = async () => {
      const reviewCounts = await axios.get(
        `http://localhost:5002/api/v1/airbnb/search/all/reviews/${propertyId}`
      );
      const revCountData = reviewCounts.data;
      console.log(revCountData);
      setReviewsList(revCountData);
      setReview(revCountData[0]);
      const revNumTotal = 0;
      var num = 0;
      for (var i = 0; i < revCountData.length; i++) {
        if (revCountData[i]) {
          num = revCountData[i].rating;
          console.log(
            "this is the rating of this review",
            revCountData[i].rating
          );
          revNumTotal = revNumTotal + num;
        }
      }
      const newRatingScore = revNumTotal / revCountData.length;
      setRatingScore(newRatingScore);
      console.log(ratingScore);
    };
    getReviews();
  }, []);
  //============================================ console.logs ===============================================================
  console.log(revCount);
  //================================================ handleSubmit =============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setContent(String(contentRef.current.value));
    if(contentRef.current.value && ratingRef.current.value && user){
      const userEmail = user.email;
      const userDoc = await axios.get(`http://localhost:5002/api/v1/airbnb/search/userbyemail/${userEmail}`)
      const userResponse = userDoc.data;
      const userId = String(userResponse._id)
      var reviewJson = {}
      reviewJson.user = userId;
      reviewJson.content = contentRef.current.value;
      reviewJson.rating = parseFloat(ratingRef.current.value);
      reviewJson.date = "11-20-1997"

      await axios
      .post(
        `http://localhost:5002/api/v1/airbnb/create/review/${propertyId}`
        ,
        reviewJson
      )
      .then((res) => {
        setReviewJson(reviewJson)
      })
      .catch((error) => {});
    contentRef.current.value = "";
    ratingRef.current.value = "";
    }

    console.log("submitted");
    console.log("this is the content", contentRef.current.value)
    console.log("this is the rating", ratingRef.current.value)
  };
//====================================================== do mapping logic here =====================================
  const renderedReviewList = reviewsList.map((r) => {
    return <ReviewComponent review={r} />;
  });

  const reRenderedReviewList = renderedReviewList.map((p) => {
    return (
      <Grid item xs={4} sm={4} md={4}>
        {p}
      </Grid>
    );
  });
//==================================================================================================================
  return (
    <div>
      <NavBar />
      <br />
      <Box pl={3}>
        <Typography variant="h4">
          <strong>Beautiful private spot in {location}</strong>{" "}
        </Typography>
      </Box>
      <br />
      <Card sx={{ maxWidth: 1500 }}>
        <CardMedia
          component="img"
          height="750"
          width="750"
          image={image}
          alt="green iguana"
          padding-bottom="20"
        />
      </Card>
      <br />
      <Typography variant="h5">
        <strong>{listingName}</strong> hosted by {owner}
      </Typography>
      <br />
      <br />
      <Divider />
      <PetsIcon /> <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
      comes with a petting zoo with monkeys!
      <br />
      <LocalBarIcon /> <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
      Local bars in the area!
      <br />
      <SailingIcon /> <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
      Sail on your own pirate ship!
      <br />
      <Divider />
      <br />
      {/* ===================================== Set the amenities ====================================*/}
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>{amenities[0]}</Grid>
        </Grid>
      </Box>
      <br />
      <div>
        <StarIcon /> <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
        <strong>{ratingScore} </strong>
        {revCount} Reviews
        <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
      </div>
      <Grid container spacing={0.75}>
        {reRenderedReviewList}
      </Grid>
      {/*============================================ AllReview Component ================================================== */}
      <SimpleDialog allReviews={reviewsList} />
      <br />
      <section>
        <strong>Title</strong>
      </section>
      <form onSubmit={handleSubmit}>
        <TextField
          inputRef={contentRef}
          className={classes.field}
          type="text"
          label="leave a review"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          inputRef={ratingRef}
          className={classes.field}
          type="text"
          label="rate this listing from 1 to 5"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
        />
        <Button type="submit" color="secondary" variant="contained">
          Submit
        </Button>
      </form>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}
