import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ValidationError } from "../../lib/validation-error";

type LoginDataType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [formData, setFormData] = useState<LoginDataType>({
    email: "",
    password: "",
  });
  const [showPassword, setShow] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginDataType>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: LoginDataType = {};

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const validateInput = ({ name, value }: { name: string; value: string }) => {
    let newErrors: LoginDataType = { ...errors };

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = "Enter valid email address.";
    } else if (name === "email" && !value) {
      newErrors.email = "Email is required.";
    } else if (name === "password" && (!value || value.length < 6)) {
      newErrors.password = "Password must be 6 characters long.";
    }
    else {
      newErrors = {...errors, [name]: ''}
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateInput({ name, value }); 
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form fields
    if (!validateForm()) return;

    // If there are no errors, submit the form
    console.log("Form submitted:", formData);
    navigate("/home");
    // Here you can proceed with your form submission logic
  };

  return (
    <form className="flex flex-wrap" onSubmit={(e) => handleSubmit(e)}>
      <FormControl variant="filled" className="flex-[100%] !pb-4">
        <TextField
          id="outlined-email-input"
          variant="outlined"
          required
          fullWidth
          value={formData.email}
          error={!!errors.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type={"email"}
          autoFocus
        />
        {!!errors["email"] && <ValidationError errors={[errors["email"]]} />}
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%] !pb-4">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          required
          name="password"
          value={formData.password}
          error={!!errors.password}
          label="Password"
          autoComplete="current-password"
          onChange={handleChange}
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
        />
        {!!errors["password"] && (
          <ValidationError errors={[errors["password"]]} />
        )}
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        onSubmit={(e) => console.log("eeeee", e)}
        className="flex-[100%] w-10"
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
