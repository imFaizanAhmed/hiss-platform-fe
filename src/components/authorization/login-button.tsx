import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { OverridableTokenClientConfig } from '@react-oauth/google';
const LoginButton = ({
  icon,
  text,
  onClick,
}: {
  icon: IconProp;
  text: string | React.ReactNode;
  onClick?: (overrideConfig?: OverridableTokenClientConfig | undefined) => void;
}) => {
  return (
    <Button
      onClick={() => {
        if (onClick) onClick();
      }}
      variant="outlined"
      className="box-border m-1 px-[15px] py-0 text-left h-12 w-full align-middle whitespace-nowrap rounded-md text-base font-medium bg-red-50 focus:outline-none active:shadow-inner"
    >
      <FontAwesomeIcon icon={icon} className="pr-4 h-5" />
      {text}
    </Button>
  );
};

export default LoginButton;
