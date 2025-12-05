import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Avatar,
  IconButton,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { setSearchQuery } from "../features/search/searchSlice";
import type { RootState } from "../store/store";

// Logo style
const LogoImage = styled("img")(({ theme }) => ({
  height: "32px",
  width: "auto",
  marginRight: theme.spacing(1),
  display: "block",
}));

// Search container style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === "light" ? "#EEF3F8" : "#38434f",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha("#EEF3F8", 0.8)
        : alpha("#38434f", 0.8),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Use React.FC instead of JSX.Element
const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: "52px !important" }}>
          <LogoImage src="/Imges/logo.png" alt="Sync-Book Logo" />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "primary.main",
              fontWeight: "bold",
              mr: 1,
            }}
          >
            SyncBook
          </Typography>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange} // <-- dispatches search query
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
              }}
            >
              <HomeIcon />
            </IconButton>

            {/* Profile */}
            <IconButton sx={{ p: 0, ml: 1 }}>
              <Avatar
                alt="User Name"
                src="/static/images/avatar/2.jpg"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
