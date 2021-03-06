import type { SerializedStyles } from '@dietacookies/ui-libs';
import { css, theme } from '@dietacookies/ui-libs';

type ValidKeys = 'root';

export type IHeaderStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (): IHeaderStyles => {
    return {
        root: {
            css: css({
                width: 228,
                display: 'flex',
                [theme.breakpoints.down('md')]: {
                    width: 'auto',
                },
            }),
        },
    };
};
