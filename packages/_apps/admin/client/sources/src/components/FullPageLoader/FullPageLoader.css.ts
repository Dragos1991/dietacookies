import type { SerializedStyles } from '@dietacookies/ui-libs';
import { css } from '@dietacookies/ui-libs';

type ValidKeys = 'root';

export type IFullPageLoaderStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (): IFullPageLoaderStyles => {
    return {
        root: {
            css: css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                p: 4,
            }),
        },
    };
};
