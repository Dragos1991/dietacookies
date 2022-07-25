import { css, ITheme, SerializedStyles, theme } from '@dietacookies/ui-libs';

type ValidKeys = 'root';

export type IHeaderStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (_theme?: ITheme): IHeaderStyles => {
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
