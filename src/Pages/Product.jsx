import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../Context/Auth";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Layout from "../CommonComponents/Layout";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Product = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState();
  //console.log(auth.token);
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `https://webskitters-student.onrender.com/product`,
        {
          headers: {
            "x-access-token": auth.token,
          },
        }
      );

      setProducts(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  console.log(products);
  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(
      `https://webskitters-student.onrender.com/delete/product/${id}`,
      {
        headers: {
          "x-access-token": auth?.token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    getProduct();
    toast.success("Product deleted successfully");
  };
  return (
    <Layout>
      <Container>
        <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Brand</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row?.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.brand}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.image ? (
                      <img
                        src={row?.image}
                        style={{ height: "10rem", width: "15rem" }}
                        alt="image"
                      />
                    ) : (
                      <img
                        src="img/altimg.jpg"
                        style={{ height: "10rem" }}
                        alt="image"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link
                      to={`/editProduct/${row._id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <Button variant="contained" color="primary">
                        <EditIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row._id)}
                      style={{ marginTop: "0.3rem" }}
                    >
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};
export default Product;
