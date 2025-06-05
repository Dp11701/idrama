import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
