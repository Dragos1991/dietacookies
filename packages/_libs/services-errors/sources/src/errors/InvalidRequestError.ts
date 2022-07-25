import { RestApiError } from './RestApiError';

export class InvalidRequestError extends RestApiError {
    public readonly statusCode = 400;
}
