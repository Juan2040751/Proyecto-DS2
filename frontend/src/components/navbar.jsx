import AdbIcon from "@mui/icons-material/Adb";
import { Box, Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useNavigate } from "react-router-dom";
import React from "react";

function NavbarApp({ window }) {
  const pages = ["Productos", "Pricing", "Blog", "Logout"];
  const navigate = useNavigate();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  const handleLogout = () => {
    localStorage.setItem("isLogged", "false");
    navigate('/');
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
              <AdbIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  fontSize: 40,
                }}
              />
              <Typography
                variant="h4"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
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
                <Button
                  key={page}
                  onClick={page === "Logout" ? handleLogout : null}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontSize: 18,
                    fontWeight: "medium",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}

export default NavbarApp;
