import type { ISagaModule } from 'redux-dynamic-modules-saga';

import { authReducer } from './reducer';
import { authenticateSaga } from './sagas/authenticate';
import { loadCurrentUserSaga } from './sagas/loadCurrentUser';

export const authModule: ISagaModule<any> = {
    id: 'auth',
    reducerMap: {
        auth: authReducer,
    },
    sagas: [loadCurrentUserSaga, authenticateSaga],
};
