import styles from './Header.module.scss';
import useWindowSize from '../../../hooks/useWindowSize';
import { BiLogIn } from 'react-icons/bi';
import RetroButton from '../RetroButton';
import DegenLogo from '../DegenLogo';
import HeaderSearchBar from '../HeaderSearchBar';
import HeaderProfile from '../HeaderProfile';
import HeaderSignIn from '../HeaderSignIn';

export default function Header({ props }: any) {
    const { width = 0 } = useWindowSize();

    return (
        <>
            <div className="header">
                <DegenLogo />
                <div
                    className={
                        props.session
                            ? width >= 480
                                ? styles.search_bar_authed_wide
                                : styles.search_bar_authed_narrow
                            : width >= 768
                            ? styles.search_bar_wide
                            : styles.search_bar_narrow
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
