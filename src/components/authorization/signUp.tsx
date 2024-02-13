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
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { ValidationError } from "../../lib/validation-error";

type SignUpDataType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const [firstTime, setFirstTime] = useState<boolean>(true);
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
  const [errors, setErrors] = useState<SignUpDataType>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: SignUpDataType = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }
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
    if (!formData.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password should be same as password";
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

  const validateInput = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    let newErrors: SignUpDataType = {...errors};

    if (name === "firstName" && !value) {
      newErrors.firstName = "First name is required.";
    }
    else if (name === "lastName" && !value) {
      newErrors.lastName = "Last name is required.";
    }
    else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = "Enter valid email address.";
    }
    else if (name === "email" && !value) {
      newErrors.email = "Email is required.";
    }
    else if (name === "password" && (!value || value.length < 6)) {
      newErrors.password = "Password must be 6 characters long.";
    }
    else if (name === "confirmPassword" && (!value || formData.password !== value)) {
      newErrors.confirmPassword = "Confirm password should be same as password.";
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
            error={!!errors.firstName}
            onChange={handleChange}
            name="firstName"
            label="First Name"
            type={"text"}
          />
          {!!errors.firstName && (
            <ValidationError errors={[errors.firstName]} />
          )}
        </FormControl>
        <FormControl variant="filled" className="flex-[100%]">
          <TextField
            variant="outlined"
            required
            fullWidth
            value={formData.lastName}
            error={!!errors.lastName}
            onChange={handleChange}
            name="lastName"
            label="Last Name"
            type={"text"}
          />
          {!!errors.lastName && <ValidationError errors={[errors.lastName]} />}
        </FormControl>
      </div>
      <FormControl variant="filled" className="flex-[100%] !mb-4">
        <TextField
          variant="outlined"
          required
          fullWidth
          value={formData.email}
          error={!!errors.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type={"email"}
        />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
        {!!errors.email && <ValidationError errors={[errors["email"]]} />}
      </FormControl>
      <FormControl variant="outlined" className="flex-[100%] !mb-4">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          required
          name="password"
          value={formData.password}
          error={!!errors.password}
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
        {!!errors.password && <ValidationError errors={[errors.password]} />}
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
          error={!!errors.confirmPassword}
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
        {!!errors.confirmPassword && (
          <ValidationError errors={[errors.confirmPassword]} />
        )}
      </FormControl>
      <Button variant="contained" type="submit" className=" flex-[100%] w-10">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
