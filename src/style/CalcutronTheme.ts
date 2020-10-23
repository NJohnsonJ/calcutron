import { createMuiTheme } from "@material-ui/core";

const green = "#00f008";

const calcutronTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: green
    }, 
    secondary: {
      main: green,
      contrastText: "#000"
    },
  }
});

export default calcutronTheme;
