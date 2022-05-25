import styles from './Header.module.scss';
import useWindowSize from '../../../hooks/useWindowSize';
import { GoThreeBars } from 'react-icons/go';
import { BiLogIn } from 'react-icons/bi';
import RetroButton from '../RetroButton';
import DegenLogo from '../DegenLogo';

export default function Header() {
  const { width } = useWindowSize();

  return (
    <>
      <div className="header">
        {width < 768 ? <GoThreeBars size={30} /> : <p></p>}
        <DegenLogo />
        {/* <h3 className={styles.logo}>Degens</h3> */}
        <RetroButton children={<BiLogIn size={30} />} />
        {/* <BiLogIn size={30} /> */}
      </div>
    </>
  );
}
