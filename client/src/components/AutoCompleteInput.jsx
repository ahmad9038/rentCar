import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({}));

const Listbox = styled("ul")(({ theme }) => ({
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  overflow: "auto",
  maxHeight: 150,
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

export default function UseAutocomplete({
  className,
  placeholder,
  city,
  setCity,
}) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: cityNames,
    getOptionLabel: (option) => option,
    value: city,
    onChange: (event, newValue) => {
      setCity(newValue);
    },
  });

  return (
    <div className=" w-full">
      {/* <Label {...getInputLabelProps()}>useAutocomplete</Label> */}
      <Input
        {...getInputProps()}
        placeholder={placeholder}
        className={`${className} `}
      />
      {groupedOptions.length > 0 ? (
        <Listbox
          className=" bg-n-8 w-full text-n-1 border border-n-3 shadow-md text-sm"
          {...getListboxProps()}
        >
          {groupedOptions.map((option, index) => (
            <li className=" px-2" {...getOptionProps({ option, index })}>
              {option}
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const cityNames = [
  "",
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Gujranwala",
  "Quetta",
  "Peshawar",
  "Sialkot",
];
