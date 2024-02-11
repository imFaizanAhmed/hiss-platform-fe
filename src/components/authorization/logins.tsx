import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
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
      return;
    } else {
      setErrors({});
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form fields
    validateForm();

    // If there are no errors, submit the form
    console.log("Form submitted:", formData);
    navigate("/home");
    // Here you can proceed with your form submission logic
  };

  return (
    <form className="flex flex-wrap" onSubmit={(e) => handleSubmit(e)}>
      <FormControl variant="filled" className="flex-[100%] !pb-4">
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
        {!!errors["email"] && (
          <ValidationError errors={[errors['email']]} />
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
          error={!!errors.password}
          // helperText={errors.password}
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
          label="Password"
        />
        {!!errors["password"] && (
          <ValidationError errors={[errors['password']]} />
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
    </form>
  );
};

export default Login;
