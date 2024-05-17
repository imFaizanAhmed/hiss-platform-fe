import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface ResponsiveInputType {
  placeholder: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}

const ResponsiveInputField = ({
  placeholder,
  Icon,
  text = "",
  setText,
  onSubmit,
}: ResponsiveInputType) => {
  const [height, setHeight] = useState<string | number>(44);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setHeight(`${event.target.scrollHeight + 4}px`); // Adjust height as content changes
  };
  return (
    <div className="responsive-input relative w-full">
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        style={{ height: height, maxHeight: 92 }}
        className="rounded-3xl border-solid border-2 px-4 py-2 w-full outline-none resize-none"
      />
      {Icon && (
        <IconButton
          aria-label="share"
          disabled={!text || !text.length}
          onClick={onSubmit}
          className="input-submit-button !absolute right-[-4px] !hidden"
        >
          <Icon />
        </IconButton>
      )}
    </div>
  );
};

export default ResponsiveInputField;
