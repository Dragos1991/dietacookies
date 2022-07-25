import { ThemeProvider, theme } from '@dietacookies/ui-libs';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { render } from 'react-dom';
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
render(
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
    document.getElementById('root'),
);
