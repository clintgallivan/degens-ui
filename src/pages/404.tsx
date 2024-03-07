import type { NextPage } from 'next';
import Head from 'next/head';
import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import RetroButton from '@components/common/RetroButton';
import styles from './404.module.scss';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Degen Analytics | Crypto</title>
            </Head>
            <TotalPageDiv>
                <div className={styles.container}>
                    <h1>Whoops... not found</h1>
                    <RetroButton onClick={() => router.push('/')}>
                        <div>Go home</div>
                    </RetroButton>
                </div>
            </TotalPageDiv>
        </>
    );
};

export default Home;
