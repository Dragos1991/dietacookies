// extracted from https://github.com/sindresorhus/serialize-error

const exposeErrorProperties = [
    { property: 'name', enumerable: false },
    { property: 'message', enumerable: false },
    { property: 'stack', enumerable: false },
    { property: 'code', enumerable: true },
];

const isCalled = Symbol('.toJSON called');

const toJSON = (from: any) => {
    from[isCalled] = true;
    const json = from.toJSON();
    delete from[isCalled];
    return json;
};

interface IDestroyCircularParams {
    from: any;
    seen: any[];
    forceEnumerable: boolean;
    maxDepth: number;
    depth: number;
    to_?: any;
}
const destroyCircular = (params: IDestroyCircularParams): any => {
    const { from, seen, to_, forceEnumerable, maxDepth } = params;
    let depth = params.depth;

    const to = to_ || (Array.isArray(from) ? [] : {});

    seen.push(from);

    if (depth >= maxDepth) {
        return to;
    }

    if (typeof from.toJSON === 'function' && from[isCalled] !== true) {
        return toJSON(from);
    }

    for (const [key, value] of Object.entries(from)) {
        if (typeof Buffer === 'function' && Buffer.isBuffer(value)) {
            to[key] = '[object Buffer]';
            continue;
        }

        if (typeof value === 'function') {
            continue;
        }

        if (!value || typeof value !== 'object') {
            to[key] = value;
            continue;
        }

        if (!seen.includes(from[key])) {
            depth++;

            to[key] = destroyCircular({
                from: from[key],
                seen: seen.slice(),
                forceEnumerable,
                maxDepth,
                depth,
            });
            continue;
        }

        to[key] = '[Circular]';
    }

    for (const { property, enumerable } of exposeErrorProperties) {
        if (typeof from[property] === 'string') {
            Object.defineProperty(to, property, {
                value: from[property],
                enumerable: forceEnumerable ? true : enumerable,
                configurable: true,
                writable: true,
            });
        }
    }

    return to;
};

export { destroyCircular };
