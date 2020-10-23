import React, { useState } from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import { Database } from "../api/database";
import firebase from "firebase";
import styled from "styled-components";
import BasicInput from "./BasicInput";

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
const expressionRegexp = /^-{0,1}[0-9\s]+(?:[+-/*%]-{0,1}[0-9\s]+)*$/.compile();

const Calculator: React.FC<Props> = ({ database, user }) => {

  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("TRY TO CONFOUND ME, HUMAN.");
  const [color, setColor] = useState<Color>("textPrimary");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInput(e.target.value);
    generateMessage();
  }

  function generateMessage() {
    setColor("textPrimary");
    if (message !== "") {
      setMessage("VERY WELL, THEN.")
    }
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
    setMessage("MATH DOES NOT CONTAIN LETTERS, HUMAN.")
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (input.length === 0) {
      generateWaitingMessage();
      return;
    }

    if (!validateInput(input)) {
      generateErrorMessage();
      return;
    }

    generateSuccessMessage();

    let result = "DOES NOT COMPUTE";
    try {
      result = eval(input);
    } catch (e) {
      console.log(e);
    }

    database.save({
      input,
      result,
      user,
      time: firebase.database.ServerValue.TIMESTAMP
    })

    setInput("");
  }

  /**
   * @param value A mathematical expression
   * @returns true if the value is an expression, otherwise false.
   */
  function validateInput(value: string): boolean {
    return expressionRegexp.test(value);
  }

  return (
    <Wrapper>
      <Card>
        <CardContent>
          <Grid container justify="center">
            <Typography color={color}><code>{message}</code></Typography>
            <BasicInput
              label="ENTER AN EXPRESSION"
              value={input}
              buttonText="="
              onChange={handleChange}
              onSubmit={handleClick}
            />
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

export default Calculator;
