import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Database, Calculation } from "../api/database";
import firebase from "firebase";
import styled from "styled-components";
import moment from "moment";

const Results: React.FC<{ database: Database }> = ({ database }) => {

  const [results, setResults] = useState<Calculation[]>([]);

  useEffect(() => {

    function handleData(data: firebase.database.DataSnapshot) {
      const json = data.toJSON();
      if (json !== null) {
        updateResults(json as Calculation);
      }
    }

    database.listen(handleData);

  }, [database]);

  function updateResults(newResult: Calculation) {
    setResults(prevState => [newResult, ...prevState]);
  }


  function prettifyDate(date: string) {
    return moment(date).format("h:mm:ss a");
  }

  return (
    <Wrapper>
      <h2>RESULTS</h2>
      {results.map(result => (
        <Card key={`result ${result.time}`}>
          <CardContent>
            <Typography variant="caption" color="textSecondary">{result.user} at {prettifyDate(result.time)}:</Typography> <Typography color="secondary">{result.input} = {result.result}</Typography>
          </CardContent>
        </Card>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
    h2 {
        text-align: center;
    }
`;

export default Results;
