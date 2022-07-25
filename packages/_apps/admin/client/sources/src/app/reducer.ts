import type { AnyAction } from 'redux';

import type { IAppState } from './types';

const initialState: IAppState = {
    color: 'red',
};

export function appReducer(state = initialState, _anyAction: AnyAction): IAppState {
    return state;
}
