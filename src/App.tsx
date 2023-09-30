import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Procedures } from "./pages/Procedures";
import { ProceduresProvider } from "./contexts/ProceduresContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <ProceduresProvider>
        <Procedures />
      </ProceduresProvider>
    </ThemeProvider>
  );
}
