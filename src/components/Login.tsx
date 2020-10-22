import { Button, Card, CardContent, FormControl, FormLabel as InputLabel, Grid, Input} from "@material-ui/core";
import React, { useState } from "react";

interface Props {
    handleSubmit: (name: string) => void;
}
const Login: React.FC<Props> = (props) => {

    const [name, setName] = useState<string>("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleSubmit(e: React.MouseEvent<any>) {
        props.handleSubmit(name);
    }

    return (
        <Grid item>
            <Card>
                <CardContent>
                    <FormControl onSubmit={handleSubmit}>
                        <InputLabel htmlFor="name-input">MORTAL, WHAT IS YOUR NAME?</InputLabel>
                        <Input id="name-input" type="input" onChange={handleChange} value={name} placeholder="name"></Input>
                        <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">ENTER</Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Login;
