import { useEffect, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import RetroButton from '../RetroButton';
import RetroLogo from '../RetroLogo';
import styles from './Navbar.module.scss';
import {
  BsGlobe,
  BsAward,
  BsPerson,
  BsTwitter,
  BsTelegram,
  BsList,
} from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';

import { GrCubes } from 'react-icons/gr';
import { FiSettings } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';
import { RiPulseLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import LogoIcon from '../../../../public/LogoIcon.svg';
import { Button } from 'react-bootstrap';
import { GoThreeBars } from 'react-icons/go';
import NavButton from './components/NavButton/NavButton';
import { useLayoutContext } from '../../../context/layoutContext';

export default function Navbar() {
  const { width = 1024 } = useWindowSize();
  const { navIsExpanded, setNavIsExpanded } = useLayoutContext();
  const [expandedCSS, setExpandedCSS] = useState('');

  useEffect(() => {
    navIsExpanded
      ? setExpandedCSS('navBar_expanded')
      : setExpandedCSS('navBar');
  }, [navIsExpanded]);

  return (
    <>
      <div className={expandedCSS}>
        <br />

        <Button
          className={styles.x_container}
          variant="transparent"
          onClick={() =>
            navIsExpanded ? setNavIsExpanded(false) : setNavIsExpanded(true)
          }
        >
          {navIsExpanded ? (
            <IoClose size={40} fill="white" />
          ) : (
            <GoThreeBars size={40} fill="white" />
          )}
        </Button>
        <br />

        <div className={styles.break} />
        <div className={styles.break} />
        <NavButton
          isExpanded={navIsExpanded}
          text="Home"
          icon={<BsGlobe size={24} />}
        />
        <div className={styles.break} />
        <NavButton
          isExpanded={navIsExpanded}
          text="Shitcoins"
          icon={<BsAward size={24} />}
        />
        <div className={styles.break} />
        <NavButton
          isExpanded={navIsExpanded}
          text="Leaderboards"
          icon={<GrCubes size={24} />}
        />
        <div className={styles.break} />
        <NavButton
          isExpanded={navIsExpanded}
          text="Profile"
          icon={<BsPerson size={24} />}
        />
        <div className={styles.break} />
        <div className={styles.break} />
        <div className={styles.break} />

        <NavButton
          isExpanded={navIsExpanded}
          text="Settings"
          icon={<FiSettings size={24} />}
        />
        <div className={styles.break} />

        <NavButton
          isExpanded={navIsExpanded}
          text="Logout"
          icon={<BiLogOut size={24} />}
        />
        <div className={styles.break} />
        <div className={styles.break} />
        <div className={styles.break} />

        <NavButton
          isExpanded={navIsExpanded}
          text="About"
          icon={<RiPulseLine size={24} />}
        />
        <br />
        <SocialIcons />
      </div>
    </>
  );
}

const SocialIcons = () => {
  return (
    <div className={styles.socials}>
      <BsTwitter size={36} />
      <FaDiscord size={36} />
      <BsTelegram size={36} />
    </div>
  );
};
