import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import withFormValidation, {
  ValidationRules,
} from "../../lib/form-validation.hoc";
import { ShowValidationError } from "../../lib/validation.error";

type LoginDataType = {
  email?: string;
  password?: string;
};

const Login = ({
  validateForm,
  validateInput,
  errors,
}: {
  validateForm?: (formData: { [key: string]: string }) => boolean;
  validateInput?: ({ name, value }: { name: string; value: string }) => boolean;
  errors?: { [key: string]: string };
}) => {
  const [formData, setFormData] = useState<LoginDataType>({
    email: "",
    password: "",
  });
  const [showPassword, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!!validateInput) validateInput({ name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form fields
    if (validateForm && !validateForm(formData)) return;

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
          error={!!errors && !!errors.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type={"email"}
          autoFocus
        />
        {!!errors && !!errors["email"] && (
          <ShowValidationError errors={[errors["email"]]} />
        )}
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%] !pb-4">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          required
          name="password"
          value={formData.password}
          error={!!errors && !!errors.password}
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
        {!!errors && !!errors["password"] && (
          <ShowValidationError errors={[errors["password"]]} />
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

const validationRules: ValidationRules = {
  email: [
    { validator: (value) => !!value, message: "Email is required" },
    {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Email is invalid",
    },
  ],
  password: [
    { validator: (value) => !!value, message: "Password is required" },
    {
      validator: (value) => value.length >= 6,
      message: "Password must be at least 6 characters long",
    },
  ],
};

const LoginFormWithValidation = withFormValidation(Login, validationRules);
export default LoginFormWithValidation;
