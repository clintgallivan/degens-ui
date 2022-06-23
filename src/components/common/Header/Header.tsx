import styles from './Header.module.scss';
import useWindowSize from '../../../hooks/useWindowSize';
import { GoThreeBars } from 'react-icons/go';
import { BiLogIn } from 'react-icons/bi';
import RetroButton from '../RetroButton';
import DegenLogo from '../DegenLogo';
import HeaderSearchBar from '../HeaderSearchBar';

export default function Header({ props }: any) {
  const { width } = useWindowSize();
  return (
    <>
      <div className="header">
        <DegenLogo />
        <div className={styles.search_bar}>
          <HeaderSearchBar props={props} />
        </div>
      </div>
    </>
  );
}
