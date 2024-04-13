import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../CommonComponents/Layout";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../CommonComponents/Loading";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const initialstate = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    first_school: "",
    image: "",
  };
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(initialstate);
  const [img, setimg] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const apiUrl = `https://webskitters-student.onrender.com/register`;
      let formdata = new FormData();
      formdata.append("name", user.name);
      formdata.append("email", user.email);
      formdata.append("mobile", user.mobile);
      formdata.append("password", user.password);
      formdata.append("first_school", user.first_school);
      formdata.append("image", img);
      const adddata = await axios.post(apiUrl, formdata);
      console.log(adddata);
      if (adddata?.data?.status) {
        navigate("/");
        toast.success(adddata?.data?.message);
        setLoader(false);
      } else {
        toast.error(adddata?.data?.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoader(false);
    }
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={5}
            style={{
              padding: "1rem 3rem",
              marginTop: "1rem",
              width: "35rem",
              marginBottom: "1rem",
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                method="post"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="mobile"
                      label="Mobile"
                      type="number"
                      value={user.mobile}
                      onChange={handleChange}
                      id="mobile"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={user.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="first_school"
                      label="First School"
                      type="text"
                      id="first_school"
                      value={user.first_school}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="image"
                      //label="Image"
                      type="file"
                      id="image"
                      onChange={(e) => setimg(e.target.files[0])}
                      accept="image/*"
                    />
                  </Grid>
                </Grid>
                {img !== "" && img !== undefined && img !== null ? (
                  <img
                    style={{ height: "180px" }}
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="upload-img"
                  />
                ) : (
                  <>{img === "" && <p>Drag or drop content here</p>}</>
                )}
                {!loader ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <Loading />
                  </Button>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};
export default Register;
