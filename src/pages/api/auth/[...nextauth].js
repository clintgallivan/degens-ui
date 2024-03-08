import axios from 'axios';
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import { clientApi } from '@utils/api';

export default NextAuth({
    // secret:process.env.NEXTAUTH_SECRET,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      version: '2.0',
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {

      const image_hi_res = token.picture.replace('_normal', '');
      const localDate = new Date();
      session.user = {
        name: token.name,
        image: token.picture,
        image_hi_res,
        uid: token.sub,
      };

      const generateUsername = async () => {
        let output = 'error';

        const apiRes = await handleSecondTwitterCall(session.user);

        output =
          apiRes.status == 201
            ? apiRes.data.body.username
            : apiRes.data.body[0].username;
        return output;
      };
      session.user['username'] = await generateUsername();
      return session;
    },
  },
});

const handleSecondTwitterCall = async (session) => {
  try {
    const res = await clientApi.post(
      '/api/users',
      {
        uid: session.uid,
        name: session.name,
        image: session.image,
        image_hi_res: session.image_hi_res,
      }
    );
    return res;
  } catch (e) {
    return e.response;
  }
};
