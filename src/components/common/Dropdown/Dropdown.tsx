import { DropdownButton, Dropdown as Dd } from 'react-bootstrap';

import styles from './Dropdown.module.scss';

export default function Dropdown({ children, onClick, selectedChild }) {
  console.log(children);
  const MenuItems = () => {
    return children.map((item) => {
      return (
        <Dd.Item
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

      <Dd.Menu className={styles.menu}>
        {MenuItems()}
        {/* <Dd.Item href="#/action-1">Action</Dd.Item>
        <Dd.Item href="#/action-2">Another action</Dd.Item>
        <Dd.Item href="#/action-3">Something else</Dd.Item> */}
      </Dd.Menu>
    </Dd>
  );
}
