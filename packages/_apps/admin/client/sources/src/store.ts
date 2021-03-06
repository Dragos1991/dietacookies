import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

import { appModule } from './app/module';
import { authModule } from './auth/module';

const configureStore = (initialState = {}) => {
    const store = createStore(
        {
            initialState: initialState,
            extensions: [
                getSagaExtension(),
                {
                    middleware: [],
                },
            ],
        },
        authModule,
        appModule,
    );

    return store;
};

export const store = configureStore();
