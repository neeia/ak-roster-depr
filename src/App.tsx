import React from "react";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";

import OperatorDataTableRow from "./components/OperatorDataTableRow";
import operators from "./data/operators.json";


const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        {operators.map((op) =>
          {
            const props = {
              name: op.name,
              rarity: op.rarity
            }
            return <OperatorDataTableRow {... props} />;
          })
        }
      </Container>
    </ThemeProvider>
  )
}

export default App;