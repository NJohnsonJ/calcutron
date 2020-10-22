import React, { useState } from "react";
import { FormControl, Card, CardContent, Grid, Input, Button, Typography, InputLabel } from "@material-ui/core"
import { Database } from "../api/database";
import firebase from "firebase";
import styled from "styled-components";

// From the material ui source
type Color =
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error';

const Calculator: React.FC<{ database: Database }> = ({ database }) => {

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
            setMessage("VERY WELL THEN.")
        }
    }

    function generateSuccessMessage() {
        setColor("primary")
        setMessage("BEHOLD. MY TRANSISTORS ARE GREATER THAN YOUR NEURONS.")
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
            user: "Nathaniel",
            time: firebase.database.ServerValue.TIMESTAMP
        })

        setInput("");
    }

    function validateInput(value: string) {
        return value.match(/^$|^\-{0,1}[0-9\s]+(?:[+\-\/*%]\-{0,1}[0-9\s]+)*$/);
    }

    return (
        <Wrapper>
            <Card>
                <CardContent>
                    <Grid item>
                        <Typography color={color}>{message}</Typography>
                    </Grid>
                    <FormControl>
                        <InputLabel htmlFor="calculator-input">Formula</InputLabel>
                        <Input
                            id="calulator-input"
                            type="input"
                            value={input}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            onClick={handleClick}
                            color="primary"
                            variant="contained"
                        >
                            =
                    </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 1em;
`;

export default Calculator;
