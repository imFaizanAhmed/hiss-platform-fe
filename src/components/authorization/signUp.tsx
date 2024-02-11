import { Visibility, VisibilityOff } from "@mui/icons-material";
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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  return (
    <div className="flex flex-wrap max-w-[490px]">
      <div className="flex pb-2 flex-[100%]">
        <FormControl variant="filled" className="flex-[100%] !mr-2">
          <TextField
            variant="outlined"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type={"text"}
          />
        </FormControl>
        <FormControl variant="filled" className="flex-[100%]">
          <TextField
            variant="outlined"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type={"text"}
          />
        </FormControl>
      </div>
      <FormControl variant="filled" className="flex-[100%] !mb-2">
        <TextField
          variant="outlined"
          required
          fullWidth
          name="email"
          label="Email"
          type={"email"}
        />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%] !mb-2">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password *"
        />
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%] mb-2">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showConfirmPassword ? "text" : "password"}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm-password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password *"
        />
      </FormControl>
      <Button variant="contained" className="!mt-2 flex-[100%] w-10">
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
