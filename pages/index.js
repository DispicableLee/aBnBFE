import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useUser } from '@auth0/nextjs-auth0';
import PropertyCard from "../components/PropertyCard";
import CardBelowGrid from "../components/CardBelowGrid";
import NavBar from "../components/NavBar";
import axios from "axios";
import Grid from '@mui/material/Grid';


export default function Home({propertiesResponse}) {
  // const { user, error, isLoading } = useUser();
  console.log(propertiesResponse)
  const property = propertiesResponse[0];
  const propertyList = propertiesResponse.map(
    p=>{return(
      <PropertyCard property={p}/>
    )}
  )
  const renderedPropertyList = propertyList.map(
    card=>{return(
      <Grid item xs={4} sm={3} md={2}>
        {card}
      </Grid>
    )}
  )
  return (
    <div>
      <NavBar/>
      <div style={{marginLeft: '10px'}}>
          <Grid container spacing={0.75}>
            {renderedPropertyList}
          </Grid>
        </div>
        <div>
          {/* card below grid */}
            <CardBelowGrid/>
        </div>
    </div>
  );
}

export async function getServerSideProps() {
  var endpointUrl = "http://localhost:5002/api/v1/airbnb/search/all/listings";
  const properties = await axios.get(endpointUrl);
  const propertiesResponse = properties.data;

  return {
    props: {propertiesResponse}
  }
}
