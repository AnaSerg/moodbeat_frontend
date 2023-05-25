import Select, { StylesConfig } from "react-select";
import { useState } from "react";
import { SelectOption } from "@/types";
import "@/shared/styles.css";

export interface OptionInterface {
  options?: SelectOption[];
  className?: string;
}

const colourStyles: StylesConfig = {
  control: (styles, { isDisabled }) => ({
    ...styles,
    display: "flex",
    backgroundColor: "#EBF1F4",
    width: "100%",
    paddingLeft: "12px",
    height: "44px",
    color: !isDisabled ? "#99A2AD" : "#2C2D2E",
    borderRadius: "12px",
    fontWeight: "400",
    border: 0,
    boxShadow: "none",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? undefined
        : isFocused
        ? "#EBF1F4"
        : "white",
      color: isDisabled ? "#99A2AD" : isSelected ? "#8A32E0" : "#2C2D2E",
      cursor: isDisabled ? "not-allowed" : "pointer",
    };
  },
};

export const SelectInput: React.FC<OptionInterface> = ({ options }) => {
  const [isSearchable] = useState(true);
  const [isDisabled] = useState(false);
  const [isLoading] = useState(false);

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={options && options[0]}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSearchable={isSearchable}
      name="single-select"
      options={options}
      styles={colourStyles}
    />
  );
};
