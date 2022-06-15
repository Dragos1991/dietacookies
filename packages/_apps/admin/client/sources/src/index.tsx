import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { App } from "./app/components/App";
import { Provider } from "react-redux";
import { store } from "./store";
import { init } from "./init";
import { Auth } from "./auth";

init();

const theme = createTheme();
const muiCache = createCache({
    key: "mui",
    prepend: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={theme}>
                    <Auth>
                        <App />
                    </Auth>
                </ThemeProvider>
            </CacheProvider>
        </BrowserRouter>
    </Provider>
);