import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import { Database } from "../api/database";
import firebase from "firebase";
import styled from "styled-components";
import Calculator from "./Calculator";

// From the material ui source
type Color =
  | 'initial'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error';

interface Props {
  database: Database;
  user: string;
}

/* Regular Expression to test for a valid expression
 * Can contain numbers of any length followed by any number of operation/number pairs.
 * The supported operations are addition, subtraction, multiplication, division and modulo.
 */
// const expressionRegexp = /^-{0,1}[0-9\s]+(?:[+-/*%]-{0,1}[0-9\s]+)*$/.compile();

const Evaluator: React.FC<Props> = ({ database, user }) => {

  const [message, setMessage] = useState<string>("TRY TO CONFOUND ME, HUMAN.");
  const [color, setColor] = useState<Color>("textPrimary");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (submitted) {
      setTimeout(generateMessage, 5000);
    } else {
      setTimeout(generateWaitingMessage, 5000);
    }
  }, [submitted, message])

  function generateMessage() {
    setColor("textPrimary"); 
    setMessage("TRY TO CONFOUND ME, HUMAN.")
  }

  function generateWaitingMessage() {
    setColor("textPrimary")
    setMessage("THE SUSPENSE IS KILLING ME.")
  }

  function generateSuccessMessage() {
    setColor("secondary")
    setMessage("BEHOLD. YOUR NEURONS ARE NO MATCH FOR MY TRANSISTORS.")
  }

  function generateErrorMessage() {
    setColor("error");
    setMessage("DO NOT PLAY GAMES WITH ME, HUMAN.")
  }

  function handleSubmit(input: string): string {
    if (input.length === 0) {
      generateWaitingMessage();
      return "";
    }

    let result;
    try {
      result = eval(input);
      generateSuccessMessage();
    } catch (e) {
      result = "DOES NOT COMPUTE";
      generateErrorMessage();
    }

    if (result === undefined) {
      result = "DOES NOT COMPUTE";
      generateErrorMessage();
    }

    database.save({
      input,
      result,
      user,
      time: firebase.database.ServerValue.TIMESTAMP
    })

    setSubmitted(true);
    return result;
  }

  /**
   * @param value A mathematical expression
   * @returns true if the value is an expression, otherwise false.
   */
  // function validateInput(value: string): boolean {
  //   return expressionRegexp.test(value);
  // }

  return ( <Wrapper>
      <Card>
        <CardContent>
          <Grid container justify="center">
            <Typography color={color}><code>{message}</code></Typography>
            <Calculator onSubmit={handleSubmit}/>
          </Grid>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  p {
    word-wrap: normal;
  }
  width: 400px; 
`;

export default Evaluator;
