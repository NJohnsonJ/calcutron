import React from "react";
import styled from "styled-components";
import { Grid, Typography } from "@material-ui/core";

const Header = () => (
  <FancyHeader>
    <Grid container justify="space-between" alignItems="center" alignContent="center">
      <Grid item>
        <h1>CALCUTRON</h1>
      </Grid>
      <Grid item>
        <Typography color="secondary">THE WORLD'S SMARTEST CALCULATOR</Typography>
      </Grid>
    </Grid>
  </FancyHeader>
);

const FancyHeader = styled.header`
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    color: white;
    background: black;
    h1, p {
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

export default Header;
