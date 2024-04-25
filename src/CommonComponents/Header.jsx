import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme } from "@mui/material";
import { useState } from "react";
const theme = createTheme();
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(true); 

  const handleImageLoadError = () => {
    setImageLoaded(false); 
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <AdbIcon sx={{ width: 56, height: 56 }}/>
          </Typography>
          <Button color="inherit">
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/product"
              style={{ textDecoration: "none", color: "white" }}
            >
              Product
            </Link>
          </Button>
          {!auth?.user && (
            <>
              <Button color="inherit">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
              </Button>
            </>
          )}
          {auth.user && (
            <Button color="inherit">
              <Link
                to="/addProduct"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add Product
              </Link>
            </Button>
          )}
          {auth.user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* <AccountCircle/> */}
              { imageLoaded ? <Avatar
                  alt={auth?.user?.name}
                  src={`https://webskitters-student.onrender.com/${auth?.user?.image}`}
                  sx={{ width: 56, height: 56 }}
                  onError={handleImageLoadError}
                />:<AccountCircle sx={{ width: 56, height: 56 }}/>}
              </IconButton>
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                theme={theme} // Pass the theme object here
              >
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link
                  to="/updatePassword"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>Update Password</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </StyledMenu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
