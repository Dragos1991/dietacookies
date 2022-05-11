import { TraceableError } from "@dietacookies/traceable-error";

export class RestApiError extends TraceableError {
    public statusCode: number | undefined = undefined;
}
