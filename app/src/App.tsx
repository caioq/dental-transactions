import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { router } from "./routes/router";
import { ViewportProvider } from "./contexts/ViewportContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <ViewportProvider>
        <RouterProvider router={router} />
      </ViewportProvider>
    </ThemeProvider>
  );
}
