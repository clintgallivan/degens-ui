import Select from 'react-select';
import styles from './MultiSelectSearchBar.module.scss';
import { moduleStyles, ModuleTypes } from './moduleConfig';

export default function MultiSelectSearchBar({
  placeholder,
  options,
  onChange,
}) {
  return (
    <Select
      closeMenuOnSelect={false}
      styles={moduleStyles}
      isMulti
      options={options}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  );
}

// const moduleOptions: readonly ModuleTypes[] = options;
