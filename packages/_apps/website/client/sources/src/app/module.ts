import { ISagaModule } from "redux-dynamic-modules-saga";
import { appReducer } from "./reducer";
import { IAppModuleState } from "./types";

export const appModule: ISagaModule<IAppModuleState> = {
    id: "app",
    reducerMap: {
        app: appReducer,
    },
    sagas: [],
};
