import { RestApiError } from './RestApiError';

export class NotFoundError extends RestApiError {
    public readonly statusCode = 404;
}
