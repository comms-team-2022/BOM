import { ChakraProvider } from "@chakra-ui/react";
import SocketsProvider from "../socket.context";
import "katex/dist/katex.min.css";
import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <SocketsProvider>
                <Component {...pageProps} />
            </SocketsProvider>
        </ChakraProvider>
    );
}

export default MyApp;
