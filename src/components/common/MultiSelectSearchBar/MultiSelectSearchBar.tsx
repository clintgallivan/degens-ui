import Select from 'react-select';
import styles from './MultiSelectSearchBar.module.scss';
// import makeAnimated from 'react-select/animated';
import { moduleStyles, ModuleTypes } from './moduleConfig';
// import  from './moduleStyles';

export default function MultiSelectSearchBar({
  placeholder,
  options,
  onChange,
}) {
  // const animatedComponents = makeAnimated();
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
