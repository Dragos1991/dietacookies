import { RestApiError } from './RestApiError';

export class UnauthorizedError extends RestApiError {
    public readonly statusCode = 401;
}
