import { useTheme } from "@mui/material";

export const ShowValidationError = ({ errors }: { errors: string[] }) => {
  const theme = useTheme();
  return (
    <div id="error">
      <ol className="text-xs pl-[14px]">
        {errors?.length &&
          errors.map((error, index) => (
            <li key={index} style={{ color: theme.palette.error.main }}>
              {error}
            </li>
          ))}
      </ol>
    </div>
  );
};
