import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper, store } from "../store";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
};

export default wrapper.withRedux(MyApp);
