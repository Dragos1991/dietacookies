import { AnyAction } from 'redux';
import { IAppState } from './types';

const initialState: IAppState = {
    color: 'red',
};

export function appReducer(state = initialState, _anyAction: AnyAction): IAppState {
    return state;
}
