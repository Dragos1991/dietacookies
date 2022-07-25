import type { SerializedStyles, Theme } from '@dietacookies/ui-libs';
import { css } from '@dietacookies/ui-libs';

type ValidKeys = 'root' | 'tabPanelRoot' | 'boxWrap';

export type IProfileStyle = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (theme: Theme): IProfileStyle => {
    return {
        root: {
            css: css({
                border: `1px solid ${theme.palette.primary.main + 46}`,
                backgroundColor: theme.palette.common.white,
                padding: theme.spacing(2.5),
            }),
        },
        tabPanelRoot: {
            css: css({
                paddingTop: theme.spacing(2.5),
            }),
        },
        boxWrap: {
            css: css({
                padding: theme.spacing(2.5),
                border: `1px solid ${theme.palette.primary.main + 46}`,
                transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
                '&:hover': {
                    boxShadow: `0px 2px 14px 0 ${theme.palette.primary.main + 46}`,
                },
            }),
        },
    };
};
