import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { appModule } from './app/module';

import { createWrapper } from 'next-redux-wrapper';

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

    console.log('test3');

    return store;
};

export const store = configureStore();
export const wrapper = createWrapper(configureStore);
