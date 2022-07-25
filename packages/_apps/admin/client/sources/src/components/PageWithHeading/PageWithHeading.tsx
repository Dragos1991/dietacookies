import type { ITheme } from '@dietacookies/ui-libs';
import { Box, useTheme } from '@dietacookies/ui-libs';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { useStyles } from './PageWithHeading.css';

interface IPageWithHeading {
    title: string;
}

const PageWithHeading: FunctionComponent<PropsWithChildren & IPageWithHeading> = ({ title, children }) => {
    const theme = useTheme() as ITheme;
    const { root, heading } = useStyles(theme);

    return (
        <>
            <Box css={root.css}>
                <h3 css={heading.css}>{title}</h3>
            </Box>
            {children}
        </>
    );
};

export { PageWithHeading };
