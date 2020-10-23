import { createMuiTheme } from "@material-ui/core";

const calcutronTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#00f008"
    }, 
    secondary: {
      main: "#00f008",
      contrastText: "#000"
    },
  }
});

export default calcutronTheme;
