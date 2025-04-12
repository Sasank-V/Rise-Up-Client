// import { IUser } from "@/types/User";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { headers } from "next/headers";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI // e.g., "http://localhost:3000/oauth2callback"
);

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, account, profile }) {
      // This is only run at login
      if (account && profile) {
        const cookieHeader = (await headers()).get("cookie") ?? "";
        const roleMatch = cookieHeader.match(/user-role=([^;]*)/);
        const role = roleMatch?.[1];
        console.log(role);
        if (role) {
          token.role = role;
        } else {
          token.role = "learner";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      console.log("Session: ", session);
      return session;
    },
    async signIn({ account, user }) {
      if (!account) return false;

      const cookieHeader = (await headers()).get("cookie") ?? "";
      const roleMatch = cookieHeader.match(/user-role=([^;]*)/);
      const role = roleMatch?.[1] ?? "learner";
      user.role = role;

      console.log(user.role);
      const res = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          google_id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
          role: user.role,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at + "",
        }),
      });
      const data = await res.json();
      console.log(data);
      return true;
    },
  },
};

// export async function refresh_access_token(user) {
//   try {
//     const oauth2Client = new OAuth2Client(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.REDIRECT_URI
//     );
//     oauth2Client.setCredentials({
//       refresh_token: user.refresh_token,
//     });
//     const { credentials } = await oauth2Client.refreshAccessToken();
//     if (credentials) {
//       user.access_token = credentials.access_token!;
//       user.expires_at = credentials.expiry_date!;
//       await user.save();

//       oauth2Client.setCredentials({
//         access_token: credentials.access_token,
//         refresh_token: credentials.refresh_token || user.refresh_token,
//         expiry_date: credentials.expiry_date,
//       });
//     }
//     console.log("Access Token Refreshed");
//   } catch (error) {
//     console.log("Error while refreshing Token: ", error);
//   }
// }
