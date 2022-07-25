import { inspect } from 'util';

type IArgs = Record<string, unknown> | undefined;
type IContext = Error | unknown | undefined;
type IMessage = string | Error | unknown;

const unknownToString = (message: IMessage) => {
    if (message instanceof Error) {
        return message.toString();
    }

    if (typeof message === 'string') {
        return message;
    }

    return inspect(message, true, 10);
};

export class TraceableError extends Error {
    private $context: IContext = undefined;
    private $args: IArgs = undefined;

    constructor(message: IMessage, context?: IContext, args?: IArgs);
    constructor(message: IMessage, context?: IArgs);

    public constructor(message: IMessage, context?: IContext | IArgs, args?: IArgs) {
        super(unknownToString(message));
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        if (context === undefined) {
            if (message instanceof Error) {
                this.$context = message;
            }
        }

        if (message instanceof Error && context === undefined) {
            this.$context = message;
        }

        if (context !== undefined && args === undefined) {
            args = {
                ...(context as IArgs),
            };
        } else if (context !== undefined) {
            this.$context = context;
        }

        if (args) {
            this.$args = args;
        }

        this.stack = String(this);

        Object.defineProperty(this, 'context', { enumerable: false });
        Object.defineProperty(this, 'args', { enumerable: false });
        Object.defineProperty(this, 'stack', { enumerable: true });
    }

    public get context(): IContext {
        return this.$context;
    }
    public get args(): IArgs {
        return this.$args;
    }
    public get body(): string {
        const context: any = this.$context;
        return context?.body || this.message;
    }
    public toString(): string {
        return inspect(this, false, 50, false);
    }
}
