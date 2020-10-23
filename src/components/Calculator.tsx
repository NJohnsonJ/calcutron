import React, { useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import BackspaceIcon from "@material-ui/icons/BackspaceOutlined";
import styled from "styled-components";

const CalculatorButton: React.FC<{onClick: () => void}> = ({onClick, ...props}) => (
  <Button variant="outlined" color="secondary" onClick={onClick}><strong>{props.children}</strong></Button>
);

export const Calculator: React.FC<{onSubmit: (value: string) => string}> = ({onSubmit}) => {

  const [input, setInput] = useState<string>("");
  const [containsResult, setContainsResult] = useState<boolean>(false);

  function handleClick(value: string) { if (containsResult) {
      clear();
    }
    setInput(prevState => prevState + value);
  }

  function clear() {
    setInput("");
    setContainsResult(false);
  }

  function backSpace() {
    setInput(prevState => prevState.slice(0, prevState.length - 1));
  }

  function handleSubmit() {
    const result = onSubmit(input);
    setInput(result);
    setContainsResult(true);
  }

  return (
    <Wrapper>
      <Grid container direction="column">
        <Typography>{input}</Typography>
        <Grid container direction="row" justify="flex-end">
          <CalculatorButton onClick={clear}>AC</CalculatorButton>
          <Button variant="outlined" color="secondary" onClick={backSpace}><BackspaceIcon /></Button>
          <CalculatorButton onClick={() => handleClick("/")}>/</CalculatorButton>
        </Grid>
        <Grid container direction="row">
          <CalculatorButton onClick={() => handleClick("1")}>1</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("2")}>2</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("3")}>3</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("*")}>*</CalculatorButton>
        </Grid>
        <Grid container direction="row">
          <CalculatorButton onClick={() => handleClick("4")}>4</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("5")}>5</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("6")}>6</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("-")}>-</CalculatorButton>
        </Grid>
        <Grid container direction="row">
          <CalculatorButton onClick={() => handleClick("7")}>7</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("8")}>8</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("9")}>9</CalculatorButton>
          <CalculatorButton onClick={() => handleClick("+")}>+</CalculatorButton>
        </Grid>
        <Grid container direction="row" justify="flex-end">
          <CalculatorButton onClick={() => handleClick("0")}>0</CalculatorButton>
          <CalculatorButton onClick={() => handleClick(".")}>.</CalculatorButton>
          <Button variant="contained" color="secondary" onClick={handleSubmit}><strong>=</strong></Button>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: black;
  border-radius: 10px;
  padding: 1em;
  p {
    background: white;
    border: 1px solid black;
    border-radius: 1px;
    height: 3em;
    text-align: right;
    margin-bottom: 0.2em;
    padding: 0.2em;
  }
  button {
    margin: 0.2em !important;
  }
`;

export default Calculator;
