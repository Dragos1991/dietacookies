import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { useStore } from "../init";

export default function MyApp({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.state);
    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
