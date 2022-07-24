import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useUser } from '@auth0/nextjs-auth0';
import PropertyCard from "../components/PropertyCard";
import axios from "axios";

export default function Home({propertiesResponse}) {
  const { user, error, isLoading } = useUser();
  console.log(propertiesResponse)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export async function getServerSideProps() {
  const properties = await axios.get("http://localhost:5002/api/v1/airbnb/search/all/listings")
  const propertiesResponse = properties.data;

  return {
    props: {propertiesResponse}
  }
}
