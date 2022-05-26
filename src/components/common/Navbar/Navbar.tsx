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
} from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';

import { GrCubes } from 'react-icons/gr';
import { FiSettings } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';
import { RiPulseLine } from 'react-icons/ri';
import LogoIcon from '../../../../public/LogoIcon.svg';

export default function Navbar() {
  const { width } = useWindowSize();

  const TextComponent = ({ text, icon }) => {
    const child = () => {
      return (
        <>
          <div className={styles.button_subcontainer}>
            {width < 1200 ? (
              <>{icon}</>
            ) : (
              <>
                {icon}
                <div className={styles.button_text}>{text}</div>
              </>
            )}
          </div>
        </>
      );
    };

    return <RetroButton children={child()} variant="white" />;
  };

  return (
    <>
      {/* {width < 768 ? (
        <></>
      ) : ( */}
      <div className="navBar">
        <br />

        <RetroLogo />
        {/* <LogoIcon /> */}

        <div className={styles.break} />
        <div className={styles.break} />
        <TextComponent text="Home" icon={<BsGlobe size={24} />} />
        <div className={styles.break} />
        <TextComponent text="Shitcoins" icon={<BsAward size={24} />} />
        <div className={styles.break} />
        <TextComponent text="Leaderboards" icon={<GrCubes size={24} />} />
        <div className={styles.break} />
        <TextComponent text="Profile" icon={<BsPerson size={24} />} />
        <div className={styles.break} />
        <div className={styles.break} />
        <div className={styles.break} />

        <TextComponent text="Settings" icon={<FiSettings size={24} />} />
        <div className={styles.break} />

        <TextComponent text="Logout" icon={<BiLogOut size={24} />} />
        <div className={styles.break} />
        <div className={styles.break} />
        <div className={styles.break} />

        <TextComponent text="About" icon={<RiPulseLine size={24} />} />
        <br />
        <SocialIcons />
      </div>
      {/* )} */}
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
