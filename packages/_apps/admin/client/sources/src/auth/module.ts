import { ISagaModule } from "redux-dynamic-modules-saga";
import { authReducer } from "./reducer";
import { authenticateSaga } from "./sagas/authenticate";

export const authModule: ISagaModule<any> = {
    id: "auth",
    reducerMap: {
        auth: authReducer,
    },
    sagas: [authenticateSaga],
};
