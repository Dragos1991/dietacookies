import type { ISagaModule } from 'redux-dynamic-modules-saga';

import { appReducer } from './reducer';
import type { IAppModuleState } from './types';

export const appModule: ISagaModule<IAppModuleState> = {
    id: 'app',
    reducerMap: {
        app: appReducer,
    },
    sagas: [],
};
