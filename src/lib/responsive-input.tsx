import { ChangeEvent, useState } from "react";

interface ResponsiveInputType {
  placeholder: string;
}

const ResponsiveInput = ({ placeholder }: ResponsiveInputType) => {
  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState<string | number>(44);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setHeight(`${event.target.scrollHeight + 4}px`); // Adjust height as content changes
  };
  return (
    <textarea
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      style={{ height: height, maxHeight: 92 }}
      className="rounded-3xl border-solid border-2 px-4 py-2 w-full outline-none resize-none lin"
    />
  );
};

export default ResponsiveInput;
