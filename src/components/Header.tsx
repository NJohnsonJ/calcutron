import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const Header = () => (
    <FancyHeader>
        <Grid container justify="center">
            <h1>CALCUTRON</h1>
        </Grid>
    </FancyHeader>
);

const FancyHeader = styled.header`
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    color: white;
    background: black;
    height: 4em;
`;

export default Header;
