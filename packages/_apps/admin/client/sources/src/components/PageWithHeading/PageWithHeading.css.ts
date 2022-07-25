import type { ITheme, SerializedStyles } from '@dietacookies/ui-libs';
import { css } from '@dietacookies/ui-libs';

type ValidKeys = 'root' | 'heading';

export type IProfileStyle = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (theme: ITheme): IProfileStyle => {
    return {
        root: {
            css: css({
                border: `1px solid ${theme.palette.primary.main + 46}`,
                backgroundColor: theme.palette.common.white,
                padding: theme.spacing(2.5),
                marginBottom: theme.spacing(2.5),
            }),
        },
        heading: {
            css: css({
                ...theme.typography.h3,
            }),
        },
    };
};
