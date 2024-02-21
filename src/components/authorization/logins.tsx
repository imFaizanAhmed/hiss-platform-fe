import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
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
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import withFormValidation, {
  ValidationRules,
} from "../../lib/form-validation.hoc";
import { ShowValidationError } from "../../lib/validation.error";
import LoginWithGoogle from "./login-with-google";
import LoginButton from "./login-button";
import axiosInstance from "../../apis/axios";
import { showToast } from "../../lib/toast";

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
  const [isEmailForm, setEmailForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation<
    AxiosResponse,
    AxiosError,
    LoginDataType
  >(loginUser, {
    onSuccess: (data) => {
      // Handle successful login here
      console.log("data =>", data);
      showToast("Login successful", "success");
      // Redirect user or show success message
      navigate("/home");
    },
    onError: (error) => {
      // Handle error case here
      if (error.response?.status === 401) {
        showToast("Invalid Credentials", "error");
      }
    },
  });

  async function loginUser({
    email,
    password,
  }: LoginDataType): Promise<AxiosResponse> {
    return axiosInstance.post("/auth/login", { email, password });
  }

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

    mutate(formData);
  };

  return (
    <>
      {!isEmailForm ? (
        <div className="flex flex-col gap-2">
          <LoginWithGoogle />
          <LoginButton
            icon={faLinkedinIn}
            text={
              <div>
                Login with Linked <span className="text-xs">(In progress)</span>
              </div>
            }
          />
          <LoginButton
            icon={faEnvelope}
            onClick={() => setEmailForm(true)}
            text="Login with Email"
          />
        </div>
      ) : (
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
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
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
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
        </form>
      )}
    </>
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
