import Select from 'react-select';
import styles from './MultiSelectSearchBar.module.scss';
// import makeAnimated from 'react-select/animated';
import { moduleStyles, ModuleTypes } from './moduleConfig';
// import  from './moduleStyles';

export default function MultiSelectSearchBar({ placeholder }) {
  // const animatedComponents = makeAnimated();
  return (
    <Select
      closeMenuOnSelect={false}
      styles={moduleStyles}
      // components={animatedComponents}
      // defaultValue={[options[4], colourOptions[5]]}
      isMulti
      options={options}
      // isLoading
      placeholder={placeholder}
    />
  );
}

const options: readonly ModuleTypes[] = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];
