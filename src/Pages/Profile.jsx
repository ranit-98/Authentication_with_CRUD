import React from "react";
import { useAuth } from "../Context/Auth";
import Layout from "../CommonComponents/Layout";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Margin } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop:"2rem",
  color: theme.palette.text.secondary,
}));

const Profile = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout>
        <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item style={{height:"18rem"}}>
              <img
                alt={auth?.user?.name}
                src={`https://webskitters-student.onrender.com/${auth?.user?.image}`}
                sx={{ width: 56, height: 56 }}
                style={{ marginTop: "2rem",borderRadius:"50%" }}
              />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              {/* <pre>{JSON.stringify(auth?.user, null, 4)}</pre> */}
              <h1>{auth?.user?.name}</h1>
              <h1>Email: {auth?.user?.email}</h1>
              <h1>Phone: {auth?.user?.mobile}</h1>
              <h1>First School: {auth?.user?.first_school}</h1>
              <h1>ID: {auth?.user?._id}</h1>
            </Item>
          </Grid>
        </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Profile;
