import styles from './Header.module.scss';
import useWindowSize from '../../../hooks/useWindowSize';
import { GoThreeBars } from 'react-icons/go';
import { BiLogIn } from 'react-icons/bi';
import RetroButton from '../RetroButton';
import DegenLogo from '../DegenLogo';
import HeaderSearchBar from '../HeaderSearchBar';
import HeaderProfile from '../HeaderProfile';
import HeaderSignIn from '../HeaderSignIn';

export default function Header({ props }: any) {
  const { width } = useWindowSize();

  return (
    <>
      <div className="header">
        <DegenLogo />
        <div
          className={
            props.session ? styles.search_bar_authed : styles.search_bar
          }
        >
          <HeaderSearchBar props={props} />
        </div>
        <div className={styles.profile}>
          {props.session ? (
            <HeaderProfile props={props} />
          ) : (
            <HeaderSignIn props={props} />
          )}
        </div>
      </div>
    </>
  );
}
