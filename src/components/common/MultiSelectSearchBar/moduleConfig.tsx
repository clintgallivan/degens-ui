import { StylesConfig } from 'react-select';

export interface ModuleTypes {
  readonly value: string;
  readonly label: string;
}

export const moduleStyles: StylesConfig<ModuleTypes, true> = {
  control: (styles) => ({
    ...styles,
    textAlign: 'left',
    color: 'white',
    backgroundColor: 'var(--purple-10)',
    borderColor: 'var(--black)',
    borderWidth: 5,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderRadius: 10,
    overflow: 'visible',
    minWidth: 200,
    boxShadow: 'none',
    ':hover': {
      ...styles[':hover'],
      borderColor: 'var(--black)',
      marginTop: 3,
      marginLeft: 2,
      borderWidth: 5,
      borderBottomWidth: 5,
      borderRightWidth: 5,
    },
  }),
  menu: (styles, { data }) => {
    return {
      ...styles,
      overflow: 'visible',
      backgroundColor: 'var(--purple-10)',
      border: '10 solid red',
      scrollbarColor: 'black',
      zIndex: 999,
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      zIndex: 999,
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
