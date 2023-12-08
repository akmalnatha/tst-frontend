import Select, { ActionMeta, SingleValue } from "react-select";

interface DropdownProps {
  placeholder: string;
  onChange?:
    | ((
        newValue: SingleValue<{
          value: string;
          label: string;
        }>,
        actionMeta: ActionMeta<{
          value: string;
          label: string;
        }>
      ) => void)
    | undefined;
  value?: { value: any; label: string };
  options: any;
  required?: boolean;
  label?: string;
  useLabel?: boolean;
  height?: string;
  disable?: boolean
}

const Dropdown = ({
  placeholder,
  onChange,
  options,
  value,
  required,
  label,
  useLabel,
  height,
  disable
}: DropdownProps) => {
  return (
    <>
      {useLabel && <label>{label}</label>}
      <Select
        required={required}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        isClearable={true}
        isSearchable={true}
        isDisabled={disable}
        value={value}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          border: "2px",

          colors: {
            ...theme.colors,
            primary: "#ED7D31",
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: "100%",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            border: state.isFocused ? "" : "2px solid #6B6B6B",
            "&:hover": {
              borderColor: state.isFocused ? "#ED7D31" : "#ED7D31",
            },
          }),
          container: (baseStyles) => ({
            ...baseStyles,
            height: height,
            width: "100%",
          }),
        }}
      />
    </>
  );
};

export default Dropdown;
