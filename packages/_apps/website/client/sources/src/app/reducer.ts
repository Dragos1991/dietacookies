import type { IAppState } from './types';

const initialState: IAppState = {
    color: 'red',
};

/**
 *
 * state
 * _anyAction: AnyAction
 */

export function appReducer(state = initialState): IAppState {
    return state;
}
