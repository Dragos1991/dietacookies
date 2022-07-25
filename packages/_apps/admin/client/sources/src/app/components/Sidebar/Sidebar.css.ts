import { css, drawerWidth, ITheme, SerializedStyles, theme } from '@dietacookies/ui-libs';

type ValidKeys = 'root' | 'drawer';

export type ISidebarStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (theme: ITheme, { matchUpMd }: any): ISidebarStyles => {
    return {
        root: {
            css: css({
                width: matchUpMd ? drawerWidth : 'auto',
            }),
        },
        drawer: {
            css: css({
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    paddingLeft: theme.spacing(2),
                    background: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderRight: 'none',
                    [theme.breakpoints.up('md')]: {
                        top: '88px',
                    },
                },
            }),
        },
    };
};
