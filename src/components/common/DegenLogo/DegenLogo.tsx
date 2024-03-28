import styles from "./DegenLogo.module.scss";
import LogoIcon from "../../../../public/DegensLogo.svg";
import Image from "next/image";
import Link from "next/link";
import useWindowSize from "@hooks/useWindowSize";

export default function DegenLogo() {
    const { width = 0 } = useWindowSize();
    return (
        <div className={styles.total_container}>
            <Link className={styles.a_tag} href="/" legacyBehavior>
                <div className={styles.container}>
                    <Image src={LogoIcon} alt="" width={width >= 480 ? 200 : 147} />
                </div>
            </Link>
        </div>
    );
}
