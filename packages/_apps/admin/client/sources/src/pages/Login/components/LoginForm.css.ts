import type { SerializedStyles, Theme } from '@dietacookies/ui-libs';
import { css } from '@dietacookies/ui-libs';

type ValidKeys = 'root';

export type ILoginFormStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (_theme: Theme): ILoginFormStyles => {
    return {
        root: {
            css: css({
                alignSelf: 'center',
                maxWidth: '400px',
                width: '100%',
            }),
        },
    };
};
