import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

import { appModule } from './app/module';

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
        appModule,
    );

    return store;
};

export const store = configureStore();
export const wrapper = createWrapper(configureStore);
