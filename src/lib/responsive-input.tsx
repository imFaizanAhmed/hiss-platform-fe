import { IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ChangeEvent, useState } from "react";

interface ResponsiveInputType {
  placeholder: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
}

const ResponsiveInputField = ({ placeholder, Icon }: ResponsiveInputType) => {
  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState<string | number>(44);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setHeight(`${event.target.scrollHeight + 4}px`); // Adjust height as content changes
  };
  return (
    <div className="relative w-full">
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        style={{ height: height, maxHeight: 92 }}
        className="rounded-3xl border-solid border-2 px-4 py-2 w-full outline-none resize-none lin"
      />
      {Icon && (
        <IconButton aria-label="share" className="!absolute right-[-4px]">
          <Icon />
        </IconButton>
      )}
    </div>
  );
};

export default ResponsiveInputField;
