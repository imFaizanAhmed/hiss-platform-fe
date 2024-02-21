import { VariantType, enqueueSnackbar } from "notistack";

export const showToast = (message: string, variant: VariantType = "info") => {
  enqueueSnackbar(message, { variant });
};
