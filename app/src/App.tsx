import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { ProceduresProvider } from "./contexts/ProceduresContext";
import { router } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <AuthProvider>
        <ProceduresProvider>
          <RouterProvider router={router} />
        </ProceduresProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
