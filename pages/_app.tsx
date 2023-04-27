import { AppProps } from "next/app";
import { TweetProvider } from "@/components/TweetContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TweetProvider>
      <Component {...pageProps} />
    </TweetProvider>
  );
}

export default MyApp;
