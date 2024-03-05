import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

type TooltipType = {
  children: ReactElement<any, any>;
  tooltipText: string;
};

export const CustomTooltip = ({ children, tooltipText }: TooltipType) => {
  return (
    <Tooltip
      title={<div style={{ color: "white" }}>{tooltipText}</div>}
      placement="top"
      arrow
    >
      {children}
    </Tooltip>
  );
};
