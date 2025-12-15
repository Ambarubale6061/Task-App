import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "../utils/api";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    getSocket();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
