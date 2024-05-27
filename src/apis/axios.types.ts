import { AxiosError, AxiosResponse } from "axios";

// Define a type for the response error data
interface ErrorResponseData {
  message: string;
  // Add other fields that your API returns in the error response
}

// Extend AxiosResponse to include custom data type
interface CustomAxiosResponse extends AxiosResponse {
  data: ErrorResponseData;
}

// Extend AxiosError to include custom response type
interface CustomAxiosError extends AxiosError {
  response?: CustomAxiosResponse;
}

export type { CustomAxiosError };
