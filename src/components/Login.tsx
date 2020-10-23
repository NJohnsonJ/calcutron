import React, { useState } from "react";
import BasicInput from "./BasicInput";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";

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
          <Grid container justify="center" direction="column">
            <Typography><code>TELL ME YOUR NAME.</code></Typography>
            <BasicInput
              value={name}
              label="NAME"
              buttonText="ENTER"
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Login;
