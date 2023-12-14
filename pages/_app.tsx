import { ActiveProvider } from "@/components";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { useEffect } from "react";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false,
//     },
//   },
// });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.style.opacity = "1";
    document.documentElement.style.height = "100%";
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ActiveProvider>
        <Component {...pageProps} />
      </ActiveProvider>
    </MantineProvider>
  );
}
