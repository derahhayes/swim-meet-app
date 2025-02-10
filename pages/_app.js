import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
      navigate={(to) => window.history.pushState(null, '', to)}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ClerkProvider>
  );
};

export default MyApp;