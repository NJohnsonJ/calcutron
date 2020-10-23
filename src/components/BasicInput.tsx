import React from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

interface InputProps {
  label: string;
  value: any;
  buttonText: string;
  onChange: (value: any) => void;
  onSubmit: (e: React.MouseEvent<any>) => void;
}

const BasicInput: React.FC<InputProps> = ({ label, value, buttonText, onChange, onSubmit }) => (
  <form>
    <FormControl>
      <InputLabel htmlFor={`basic-input-${label}`}>{label}</InputLabel>
      <Input
        id={`basic-input-${label}`}
        type="input"
        value={value}
        onChange={onChange}
      />
      <Button
        type="submit"
        onClick={e => {e.preventDefault(); onSubmit(e);}}
        color="primary"
        variant="contained"
      >
        {buttonText}
      </Button>
    </FormControl>
  </form>
);

export default BasicInput;
