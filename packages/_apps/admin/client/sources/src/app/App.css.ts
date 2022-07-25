import type { SerializedStyles } from '@dietacookies/ui-libs';
import { css } from '@dietacookies/ui-libs';

type ValidKeys = 'root';

export type IAppStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (): IAppStyles => {
    return {
        root: {
            className: 'root',
            css: css({
                height: '100%',
                display: 'flex',
            }),
        },
    };
};
