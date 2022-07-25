import type { SerializedStyles } from '@dietacookies/ui-libs';
import { css } from '@dietacookies/ui-libs';

type ValidKeys = 'root';

export type IUserSectionStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (): IUserSectionStyles => {
    return {
        root: {
            css: css({
                marginLeft: 'auto',
            }),
        },
    };
};
