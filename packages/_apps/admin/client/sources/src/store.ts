import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { appModule } from "./app/module";

export const configureStore = (initialState = {}) => {
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
        appModule
    );

    return store;
};
