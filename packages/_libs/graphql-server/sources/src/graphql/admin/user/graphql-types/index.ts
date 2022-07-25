import { mergeTypeDefs } from '@graphql-tools/merge';

import { inputs } from './inputs';
import { types } from './types';
import { query } from './query';
import { mutation } from './mutation';

const userTypes = mergeTypeDefs([inputs, types, query, mutation]);

export { userTypes };
