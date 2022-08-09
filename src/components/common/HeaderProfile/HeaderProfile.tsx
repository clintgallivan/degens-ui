import React from 'react';
import Image, { ImageLoaderProps } from 'next/image';
import { signOut } from 'next-auth/react';
import Dropdown from 'react-bootstrap/Dropdown';

import { FiSettings } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import styles from './HeaderProfile.module.scss';

type ToggleProps = {
  children: any;
  onClick: any;
};

export default function HeaderProfile({ props }: any) {
  console.log(props);
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return src;
  };

  const CustomToggle = React.forwardRef(
    ({ children, onClick }: ToggleProps, ref) => (
      <div
        className={styles.container}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <Image
          unoptimized
          className={styles.image}
          loader={imageLoader}
          src={props?.session?.user?.image}
          alt=""
          width={50}
          height={50}
        />
      </div>
    )
  );

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Custom toggle
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.menu}>
          <Dropdown.Item
            className={styles.item}
            eventKey="1"
            href={`/users/${props.session.user.username}`}
          >
            <BsPerson size={14} className={styles.icon} />
            My Profile
          </Dropdown.Item>
          <div className={styles.line_break} />
          <Dropdown.Item className={styles.item} eventKey="2">
            <FiSettings size={14} className={styles.icon} />
            Account
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.item}
            eventKey="3"
            onClick={() => signOut()}
          >
            <MdLogout size={14} className={styles.icon} />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
