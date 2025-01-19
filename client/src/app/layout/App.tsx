import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  const toggleMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar mode={themeMode} toggleMode={toggleMode} />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            themeMode === "dark"
              ? "radial-gradient(circle, #1e3aBa, #111B27)"
              : "radial-gradient(circle, #baecf9, #f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 14 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
