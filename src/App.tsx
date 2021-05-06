import React from "react";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";

import OperatorDataTableRow, {
  OperatorProps,
} from "./components/OperatorDataTableRow";
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
              potential: 1,
              promotion: 0,
              level: 0,
              skillLevel: 1,
              skill1Mastery: 0,
              skill2Mastery: 0,
              skill3Mastery: 0
            }
            return <OperatorDataTableRow {... props} />;
          })
        }
      </Container>
    </ThemeProvider>
  )
}

export default App;