import React, { useState } from "react";
import BasicInput from "./BasicInput";
import { Grid, Card, CardContent } from "@material-ui/core";

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
                    <BasicInput
                        value={name}
                        label="WHAT IS YOUR NAME?"
                        buttonText="ENTER"
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Login;
