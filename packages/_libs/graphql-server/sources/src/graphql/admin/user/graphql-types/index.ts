import { mergeTypeDefs } from '@graphql-tools/merge';

import { inputs } from './inputs';
import { mutation } from './mutation';
import { query } from './query';
import { types } from './types';

const userTypes = mergeTypeDefs([inputs, types, query, mutation]);

export { userTypes };
