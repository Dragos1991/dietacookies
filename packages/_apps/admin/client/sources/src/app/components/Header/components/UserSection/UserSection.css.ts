import { css, ITheme, SerializedStyles } from '@dietacookies/ui-libs';

type ValidKeys = 'root';

export type IUserSectionStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (_theme: ITheme): IUserSectionStyles => {
    return {
        root: {
            css: css({
                marginLeft: 'auto',
            }),
        },
    };
};
