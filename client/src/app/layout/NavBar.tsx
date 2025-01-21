import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { LightMode, DarkMode, ShoppingCart } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};

export default function NavBar() {
  const { isLoading, darkMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const { data: basket } = useFetchBasketQuery();

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography component={NavLink} to="/" variant="h6" sx={navStyles}>
            Re-store
          </Typography>
          <IconButton onClick={() => dispatch(toggleDarkMode())}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "white" }} />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton component={Link} to="/basket" size="large">
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </AppBar>
  );
}
