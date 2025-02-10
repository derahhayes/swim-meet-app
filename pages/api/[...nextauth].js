import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement your authentication logic (could be an API request to verify user)
        const user = { id: 1, username: "admin", role: "superuser" }; // Mock superuser
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user = user; // Add user to session
      return session;
    },
  },
});
