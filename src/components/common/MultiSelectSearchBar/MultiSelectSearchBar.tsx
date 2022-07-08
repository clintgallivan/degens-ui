import Select, { StylesConfig } from 'react-select';
import styles from './MultiSelectSearchBar.module.scss';
import makeAnimated from 'react-select/animated';

export default function MultiSelectSearchBar({ placeholder }) {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const animatedComponents = makeAnimated();
  return (
    // <div className={styles.container}>
    <Select
      closeMenuOnSelect={false}
      styles={colourStyles}
      // components={animatedComponents}
      // defaultValue={[options[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
      // isLoading
      placeholder={placeholder}
    />
    // </div>
  );
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean' },
  // { value: 'blue', label: 'Blue', },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];

const colourStyles: StylesConfig<ColourOption, true> = {
  // container: (styles) => ({
  //   ...styles,
  //   backgroundColor: 'pink',
  //   borderColor: 'pink',
  // }),
  control: (styles) => ({
    ...styles,
    textAlign: 'left',
    color: 'white',
    backgroundColor: 'var(--purple-10)',
    borderColor: 'var(--purple-30)',
    borderWidth: 5,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderRadius: 10,
    overflow: 'visible',
    minWidth: 200,
    boxShadow: 'none',
    ':hover': {
      ...styles[':hover'],
      borderColor: 'var(--purple-30)',
      marginTop: 3,
      marginLeft: 2,
      borderWidth: 5,
      borderBottomWidth: 5,
      borderRightWidth: 5,
    },
    // ':after': {
    //   // ...styles[':target'],
    //   backgroundColor: 'green',
    //   borderColor: 'pink',
    // },
  }),
  menu: (styles, { data }) => {
    return {
      ...styles,
      overflow: 'visible',
      backgroundColor: 'var(--purple-10)',
      border: '10 solid red',
      scrollbarColor: 'black',
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: 'var(--transparent)',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'var(--purple-30)',
        borderRadius: 4,
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'var(--purple-20)',
      },
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'green';
    return {
      ...styles,
      textAlign: 'left',
      backgroundColor: 'var(--transparent)',
      ':active': {
        ...styles[':active'],
        backgroundColor: 'pink',
      },
      ':hover': {
        ...styles[':hover'],
        backgroundColor: 'var(--transparent)',
        color: 'var(--purple-20)',
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      overflow: 'visible',
      // backgroundColor: color,
      backgroundColor: 'var(--orange-20)',
      borderRadius: 14,
      color: '--var(--black)',
      // zIndex: 999,
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: 'var(--black)',
    overflow: 'visible',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: 'var(--black)',
    ':hover': {
      backgroundColor: 'var(--orange-30)',
      overflow: 'visible',
      borderTopRightRadius: 14,
      borderBottomRightRadius: 14,
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'var(--purple-20)',
  }),
};
