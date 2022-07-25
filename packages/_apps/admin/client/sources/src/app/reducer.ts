import type { IAppState } from './types';

const initialState: IAppState = {
    color: 'red',
};

export function appReducer(state = initialState): IAppState {
    return state;
}
