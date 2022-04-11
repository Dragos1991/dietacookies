import { DeepPartial } from "redux";
import { IModuleStore } from "redux-dynamic-modules";
import { configureStore } from "./store";

let store: IModuleStore<DeepPartial<unknown>> | null;
export const initializeStore = (preloadedState: DeepPartial<unknown>) => {
    let _store = store || configureStore(preloadedState);

    if (preloadedState && store) {
        _store = configureStore({ ...store.getState(), ...preloadedState });
        store = null;
    }

    if (typeof window === "undefined") {
        return _store;
    }

    if (!store) {
        store = _store;
    }

    return store;
};

export const useStore = (preloadedState: DeepPartial<unknown>) =>
    initializeStore(preloadedState);
