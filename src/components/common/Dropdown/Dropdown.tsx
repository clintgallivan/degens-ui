import { DropdownButton, Dropdown as Dd } from 'react-bootstrap';

import styles from './Dropdown.module.scss';

type DropdownPropTypes = {
  children: any;
  onClick: (item: any) => void;
  selectedChild: any;
};

type ItemPropTypes = {
  text: string;
};

export default function Dropdown({
  children,
  onClick,
  selectedChild,
}: DropdownPropTypes) {
  const MenuItems = () => {
    return children.map((item: ItemPropTypes) => {
      return (
        <Dd.Item
          key={item.text}
          className={styles.item}
          href="#/action-1"
          onClick={() => onClick(item)}
        >
          {item.text}
        </Dd.Item>
      );
    });
  };

  return (
    <Dd>
      <Dd.Toggle
        className={styles.toggle}
        variant="transparent"
        id="dropdown-basic"
      >
        {selectedChild || 'Twitter Followers'}
      </Dd.Toggle>

      <Dd.Menu className={styles.menu}>{MenuItems()}</Dd.Menu>
    </Dd>
  );
}
