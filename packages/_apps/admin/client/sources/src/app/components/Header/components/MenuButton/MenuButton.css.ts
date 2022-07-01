import { css, ITheme, SerializedStyles, theme } from "@dietacookies/ui-libs";

type ValidKeys = "avatar";

export type IMenuButtonStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (theme: ITheme): IMenuButtonStyles => {
    return {
        avatar: {
            css: css({
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: "all .2s ease-in-out",
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                "&:hover": {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light,
                },
            }),
        },
    };
};
