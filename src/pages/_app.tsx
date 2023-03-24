import "normalize.css";
import { AppProps } from "next/app";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import AuthContextProvider from "../contexts/authContext";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Script strategy="afterInteractive" src="https://assets.swarmcdn.com/cross/swarmdetect.js"/>
      <Script
        id='swarmify'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var swarmoptions = {
                swarmcdnkey: "68f9693f-4651-4ab6-9a03-2760ae3024f3",
                iframeReplacement: "iframe",
                autoreplace: {
                    youtube: true
                },
                theme: {
                    button: "circle",
                    primaryColor: "#328ac6"
                }
            };`,
          }}
      />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
