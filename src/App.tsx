import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Calculator from "./components/Calculator";
import { Grid, ThemeProvider } from "@material-ui/core";
import Results from "./components/Results";
import { Database, setupDatabase } from "./api/database";
import styled from "styled-components";
import Login from './components/Login';
import calcutronTheme from "./style/CalcutronTheme";

function App() {

  const [user, setUser] = useState<string>("");
  const [database, setDatabase] = useState<Database | null>(null);

  // Setup the database connection
  useEffect(() => {
    setDatabase(setupDatabase());
  }, []);

  return (
    <ThemeProvider theme={calcutronTheme}>
      <MainContainer>
        <Header />
        <main>
          <Grid container direction="column" alignContent="center">
            {user === "" && (
              <Login handleSubmit={setUser} />
            )}
            {database !== null && user !== "" && (
              <React.Fragment>
                <Grid item>
                  <Calculator database={database} user={user} />
                </Grid>
                <Grid item>
                  <Results database={database} />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </main>
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled.div`
  background: #f0f0fc;
  min-height: 100vh;
  .MuiCard-root {
    margin: 1em;
  }
  .MuiButton-root {
    margin: 1em;
  }
`;

export default App;
