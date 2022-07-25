import type { Action as ReduxAction } from 'redux';

export interface IAction<T> extends ReduxAction<T> {
    /**
     * The meta property for the action (see Flux Standard Actions)
     */
    meta?: IActionMeta<any>;
}

/**
 * A better typing for the Redux Action
 */
export interface IActionWithPayload<T extends string, P> extends IAction<T> {
    /**
     * The payload of this action
     */
    payload: P;
    meta?: IActionMeta<P>;
}

export type IActionMetaKpiTransformer<P> = (payload: P) => any;

export interface IActionMeta<P> {
    kpi?: boolean | IActionMetaKpiTransformer<P>;
    previewOnly?: boolean;
    [key: string]: any;
}

/**
 * Create a new action with type and payload
 * @param type The action type
 * @param payload The payload
 */
export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P>(type: T, payload: P, meta?: IActionMeta<P>): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P, meta?: IActionMeta<P>) {
    return { type, payload, meta };
}

export type IActionCreator<T> = (meta?: IActionMeta<void>) => IAction<T>;
export type IActionWithPayloadCreator<T extends string, P> = (
    payload: P,
    meta?: IActionMeta<P>,
) => IActionWithPayload<T, P>;

/**
 * @copyright Copyright (c) 2018 Martin Hochel
 * Borrowed from the rex-tils library
 */

interface IActionsCreatorsMapObject {
    [actionCreator: string]: (...args: any[]) => any;
}
export type ActionsUnion<A extends IActionsCreatorsMapObject> = ReturnType<A[keyof A]>;
export type ActionsOfType<ActionUnion, ActionType extends string> = ActionUnion extends IAction<ActionType>
    ? ActionUnion
    : never;
