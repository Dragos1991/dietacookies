import { ISagaModule } from 'redux-dynamic-modules-saga';
import { authReducer } from './reducer';
import { loadCurrentUserSaga } from './sagas/loadCurrentUser';
import { authenticateSaga } from './sagas/authenticate';

export const authModule: ISagaModule<any> = {
    id: 'auth',
    reducerMap: {
        auth: authReducer,
    },
    sagas: [loadCurrentUserSaga, authenticateSaga],
};
