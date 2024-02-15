import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import withFormValidation, {
  ValidationRules,
} from "../../lib/form-validation.hoc";
import { ShowValidationError } from "../../lib/validation.error";

type SignUpDataType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = ({
  validateForm,
  validateInput,
  errors,
}: {
  validateForm?: (formData: { [key: string]: string }) => boolean;
  validateInput?: ({
    formData,
    name,
    value,
  }: {
    formData: { [key: string]: string };
    name: string;
    value: string;
  }) => boolean;
  errors?: { [key: string]: string };
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!!validateInput) validateInput({ formData, name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form fields
    if (!!validateForm && !validateForm(formData)) return;

    // If there are no errors, submit the form
    console.log("Form submitted:", formData);
    navigate("/home");
    // Here you can proceed with your form submission logic
  };

  return (
    <form
      className="flex flex-wrap max-w-[490px]"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex pb-4 flex-[100%]">
        <FormControl variant="filled" className="flex-[100%] !mr-2">
          <TextField
            variant="outlined"
            required
            fullWidth
            autoFocus
            value={formData.firstName}
            error={!!errors && !!errors.firstName}
            onChange={handleChange}
            name="firstName"
            label="First Name"
            type={"text"}
          />
          {!!errors && !!errors.firstName && (
            <ShowValidationError errors={[errors.firstName]} />
          )}
        </FormControl>
        <FormControl variant="filled" className="flex-[100%]">
          <TextField
            variant="outlined"
            required
            fullWidth
            value={formData.lastName}
            error={!!errors && !!errors.lastName}
            onChange={handleChange}
            name="lastName"
            label="Last Name"
            type={"text"}
          />
          {!!errors && !!errors.lastName && (
            <ShowValidationError errors={[errors.lastName]} />
          )}
        </FormControl>
      </div>
      <FormControl variant="filled" className="flex-[100%] !mb-4">
        <TextField
          variant="outlined"
          required
          fullWidth
          value={formData.email}
          error={!!errors && !!errors.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type={"email"}
        />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
        {!!errors && !!errors.email && (
          <ShowValidationError errors={[errors["email"]]} />
        )}
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%] !mb-4">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          required
          name="password"
          value={formData.password}
          error={!!errors && !!errors.password}
          // helperText={errors.password}
          onChange={handleChange}
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
          label="Password"
        />
        {!!errors && !!errors.password && (
          <ShowValidationError errors={[errors.password]} />
        )}
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%] !mb-4">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showConfirmPassword ? "text" : "password"}
          required
          name="confirmPassword"
          value={formData.confirmPassword}
          error={!!errors && !!errors.confirmPassword}
          onChange={handleChange}
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
          label="Confirm Password"
        />
        {!!errors && !!errors.confirmPassword && (
          <ShowValidationError errors={[errors.confirmPassword]} />
        )}
      </FormControl>
      <Button variant="contained" type="submit" className=" flex-[100%] w-10">
        Sign Up
      </Button>
    </form>
  );
};

const validationRules: ValidationRules = {
  firstName: [
    { validator: (value) => !!value, message: "First name is required" },
  ],
  lastName: [
    { validator: (value) => !!value, message: "Last name is required" },
  ],
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
      validator: (value) => value.length > 6,
      message: "Password must be at least 6 characters long",
    },
  ],
  confirmPassword: [
    {
      validator: (value, formData) =>
        !!value && !!formData && value === formData.password,
      message: "confirm Password should be same as confirm password",
    },
    {
      validator: (value) => value.length > 6,
      message: "Password must be at least 6 characters long",
    },
  ],
};

const SignUpFormWithValidation = withFormValidation(SignUp, validationRules);
export default SignUpFormWithValidation;
