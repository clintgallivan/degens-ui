import Select from 'react-select';
import styles from './MultiSelectSearchBar.module.scss';
import { moduleStyles, ModuleTypes } from './moduleConfig';

type MultiSelectSearchBarProps = {
  placeholder: string;
  options: readonly { value: any; label: any }[];
  onChange: (e: any) => any;
  defaultValue?: any;
};

export default function MultiSelectSearchBar({
  placeholder,
  options,
  onChange,
  defaultValue,
}: MultiSelectSearchBarProps) {
  return (
    <Select
      defaultValue={
        defaultValue && defaultValue.length > 0
          ? [{ value: defaultValue[0], label: defaultValue[0] }]
          : []
      }
      closeMenuOnSelect={false}
      styles={moduleStyles}
      isMulti
      options={options}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  );
}
