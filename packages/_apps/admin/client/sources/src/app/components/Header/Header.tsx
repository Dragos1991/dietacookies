import type { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { Box } from '@dietacookies/ui-libs';

import { LogoSection, MenuButton, UserSection } from './components';
import { useStyles } from './Header.css';

interface IHeaderProps {
    setLeftDrawerOpened: Dispatch<SetStateAction<boolean>>;
    leftDrawerOpened: boolean;
}

const HeaderB: FunctionComponent<IHeaderProps> = ({ setLeftDrawerOpened, leftDrawerOpened }) => {
    const { root } = useStyles();

    return (
        <>
            <Box css={root.css}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <MenuButton setLeftDrawerOpened={setLeftDrawerOpened} leftDrawerOpened={leftDrawerOpened} />
            </Box>
            <UserSection />
        </>
    );
};

export const Header = HeaderB;
