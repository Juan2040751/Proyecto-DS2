import AdbIcon from "@mui/icons-material/Adb";
import { Box, Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import React from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { NavLink } from "react-router-dom";

function NavbarApp({ window }) {
  const pages = ["Facturacion", "Productos", "Logout"];

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "left",
                marginLeft: "2%",
              }}
            >
              <ReceiptIcon
                sx={{
                  display: { xs: "none", md: "flex", color: "#00AB55" },
                  mr: 1,
                  fontSize: 40,
                }}
              />
              <Typography
                variant="h4"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Turbo
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                justifyContent: "right",
              }}
            >
              {pages.map((page) => (
                <NavLink
                  key={page}
                  to={ page === "Logout" ? "/" : "/" + page.toLowerCase()}
                  style={({ isActive, isPending }) => {
                    return {
                      textDecoration: "none",
                      padding: "1%",
                      color: isActive? "white":"black",
                      display: "flex",
                      fontSize: 18,
                      fontWeight: "medium",
                      backgroundColor: isActive? "#00AB55":"transparent",
                      borderRadius: 7,
                    };
                  }}
                  onClick={page === "Logout" ? handleLogout : undefined}
                >
                  {page}
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}

export default NavbarApp;
