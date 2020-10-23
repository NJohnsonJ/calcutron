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

  function generateSuccessMessage() {
    setColor("secondary")
    setMessage("BEHOLD. YOUR NEURONS ARE NO MATCH FOR MY TRANSISTORS.")
  }

  function generateErrorMessage() {
    setMessage("MATH DOES NOT CONTAIN LETTERS, HUMAN.")
    setColor("error");
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {

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

  function validateInput(value: string) {
    return value.match(/^$|^-{0,1}[0-9\s]+(?:[+-/*%]-{0,1}[0-9\s]+)*$/);
  }

  return (
    <Wrapper>
      <Card>
        <CardContent>
          <Grid item>
            <Typography color={color}>{message}</Typography>
          </Grid>
          <BasicInput
            label="ENTER AN EXPRESSION"
            value={input}
            buttonText="="
            onChange={handleChange}
            onSubmit={handleClick}
          />
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
