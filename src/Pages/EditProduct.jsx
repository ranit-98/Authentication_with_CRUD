
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../CommonComponents/Layout";
import axios from "axios";
import { useAuth } from "../Context/Auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const defaultTheme = createTheme();

const EditProducts=()=> {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    image: null,
  });
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://webskitters-student.onrender.com/edit/product/${id}`,
          {
            headers: {
              "x-access-token": auth.token,
            },
          }
        );

        const productInitialval = res?.data?.data;

        setProduct({
          name: productInitialval.name,
          price: productInitialval.price,
          description: productInitialval.description,
          brand: productInitialval.brand,
          image: productInitialval.image,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id, auth.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = `https://webskitters-student.onrender.com/update/product/${id}`;
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("brand", product.brand);
    formData.append("image", product.image);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "x-access-token": auth?.token,
          
        },
      });
      navigate("/product");
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("Error occurred:", error);
      toast.error("Provide all the details correctly");
    }
  };

  console.log(product?.image);
  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={6}
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
                <AppRegistrationIcon fontSize="large" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Product
              </Typography>
              <Box
                component="form"
                method="post"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="price"
                  value={product.price}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  value={product.description}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="brand"
                  label="Brand"
                  id="brand"
                  value={product.brand}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="image"
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {product.image   && product.image instanceof File &&(
                  <img
                    style={{ height: "180px" }}
                    src={URL.createObjectURL(product?.image)}
                    alt=""
                    className="upload-img"
                  />
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </Layout>
  );
}
export default EditProducts