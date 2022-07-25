import { ThemeProvider, theme } from '@dietacookies/ui-libs';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';
import { Auth } from './auth';
import { init } from './init';
import { store } from './store';

init();

const muiCache = createCache({
    key: 'mui',
    prepend: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
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
    </Provider>,
);
