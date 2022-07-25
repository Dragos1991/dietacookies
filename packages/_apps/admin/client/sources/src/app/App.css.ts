import { css, Theme, SerializedStyles } from '@dietacookies/ui-libs';
import loginImage from './assets/loginImage.jpg';

type ValidKeys = 'root';

export type IAppStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (_theme: Theme): IAppStyles => {
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
