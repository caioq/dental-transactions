import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { router } from "./routes/router";
import { ProceduresProvider } from "./contexts/ProceduresContext";
import { ViewportProvider } from "./contexts/ViewportContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <ViewportProvider>
        <ProceduresProvider>
          <RouterProvider router={router} />
        </ProceduresProvider>
      </ViewportProvider>
    </ThemeProvider>
  );
}
