import { useContext } from "react";
import { ThemeContext } from "../AppContext";

export default function InputComponent({
  inputTitle,
  isMandatory,
  type,
  name,
  value,
  divInlineStyle,
  textInlineStyle,
  inputInlineStyle,
  onChange,
}) {
  const { theme, bgColors, contentConfig } = useContext(ThemeContext);
  return (
    <div className="w-100 mt-3" style={{ ...divInlineStyle }}>
      <p
        className="text-primary-3 font-medium text-sm"
        style={{ ...textInlineStyle }}
      >{`${inputTitle} ${isMandatory == true ? "*" : ""}`}</p>
      <input
        type={type}
        name={name}
        value={value}
        className="mt-1 rounded-md px-3 py-2 border-none outline-none focus:ring-1 text-sm bg-customShade-5 text-primary-3"
        style={{
          ...{
            width: "100%",
            backgroundColor: bgColors[`${theme}-primary-bg-color-4`],
          },
          ...inputInlineStyle,
        }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
