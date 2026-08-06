import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

type RefreshableToken = {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  error?: 'RefreshAccessTokenError';
};

async function refreshAccessToken(token: RefreshableToken) {
  try {
    if (!token.refreshToken) {
      throw new Error('No Google refresh token is available.');
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        'GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing.'
      );
    }

    const response = await fetch(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken,
        }),
        cache: 'no-store',
      }
    );

    const refreshed = await response.json();

    if (!response.ok) {
      throw refreshed;
    }

    return {
      ...token,
      accessToken: refreshed.access_token as string,
      accessTokenExpires:
        Date.now() + Number(refreshed.expires_in) * 1000,
      refreshToken:
        (refreshed.refresh_token as string | undefined) ??
        token.refreshToken,
      error: undefined,
    };
  } catch (error) {
    console.error('Google access-token refresh failed:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError' as const,
    };
  }
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be defined in .env.local.'
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,

      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/calendar.readonly',
          ].join(' '),

          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires:
            account.expires_at !== undefined
              ? account.expires_at * 1000
              : Date.now() + 60 * 60 * 1000,
          refreshToken:
            account.refresh_token ?? token.refreshToken,
          error: undefined,
        };
      }

      if (
        token.accessToken &&
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - 60_000
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});