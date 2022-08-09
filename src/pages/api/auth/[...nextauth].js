import axios from 'axios';
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      version: '2.0',
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        name: token.name,
        image: token.picture,
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
    const res = await axios.post(
      // '/api/users',
      // 'http://127.0.0.1:3000/api/users',
      `${process.env.BASE_URL}/api/users`,

      { uid: session.uid, name: session.name, image: session.image },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (e) {
    return e.response;
  }
};
