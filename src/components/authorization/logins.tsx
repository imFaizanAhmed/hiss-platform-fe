import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShow] = useState<boolean>(false);
  return (
    <div className="flex flex-wrap">
      <FormControl variant="filled" className="flex-[100%]">
        <TextField
          variant="outlined"
          required
          fullWidth
          name="email"
          label="Email"
          type={"email"}
        />
        <FormHelperText id="my-helper-text" className="pb-2">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%]">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShow(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="contained" className="!mt-2 flex-[100%] w-10">
        Sign In
      </Button>
    </div>
  );
};

export default Login;
