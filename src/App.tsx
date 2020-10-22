import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Calculator from "./components/Calculator";
import { Grid } from "@material-ui/core";
import Results from "./components/Results";
import { Database, setupDatabase } from "./api/database";
import styled from "styled-components";

function App() {

  const [database, setDatabase] = useState<Database|null>(null);

  // Setup the database connection
  useEffect(() => {
    setDatabase(setupDatabase());
  }, []);

  return (
    <MainContainer>
      <Header/>
      <main>
        {database !== null && (
          <Grid container direction="column" alignContent="center">
            <Calculator database={database} />
            <Results database={database} />
          </Grid>
        )}
      </main>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background: #f0f0fc;
  min-height: 100vh;
`;

export default App;
