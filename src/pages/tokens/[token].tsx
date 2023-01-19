import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import clientPromise from '@utils/mongodb';

import TotalPageDiv from '@components/common/Divs/TotalPageDiv';
import NonNavDiv from '@components/common/Divs/NonNavDiv';
import Navbar from '@components/common/Navbar';
import Header from '@components/common/Header';
import TokenSection from '@components/tokens/TokenSection';

const Token: NextPage = (props: any) => {
    const router = useRouter();
    const { token } = router.query;

    return (
        <>
            <Head>
                <title>Degens | {props.tokenMetadata[0].name || 'Crypto'}</title>
            </Head>
            <TotalPageDiv>
                <Navbar />
                <NonNavDiv>
                    <Header props={props} />
                    <TokenSection props={props} />
                </NonNavDiv>
            </TotalPageDiv>
        </>
    );
};

export default Token;

export const getServerSideProps: GetServerSideProps = async context => {
    const id = context.query.token;
    try {
        const session = await getSession(context);
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const getTokenMetadata = async () => {
            let output = await db.collection('token-metadata').find({ coingecko_id: id }).toArray();
            return JSON.parse(JSON.stringify(output));
        };
        const getTokenTimeseries = async () => {
            let output = await db
                .collection('token-timeseries')
                .find({ coingecko_id: id })
                .toArray();
            return JSON.parse(JSON.stringify(output));
        };

        let [tokenMetadata, tokenTimeseries] = await Promise.all([
            getTokenMetadata(),
            getTokenTimeseries(),
        ]);

        return {
            props: { isConnected: true, session, tokenMetadata, tokenTimeseries },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { isConnected: false },
        };
    }
};
