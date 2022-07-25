import { useTheme, ITheme, Drawer, useMediaQuery, Box } from '@dietacookies/ui-libs';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { useStyles } from './Sidebar.css';

interface IMainProps {
    setLeftDrawerOpened: Dispatch<SetStateAction<boolean>>;
    leftDrawerOpened: boolean;
}

const SidebarB: FunctionComponent<IMainProps> = ({ setLeftDrawerOpened, leftDrawerOpened }) => {
    const theme = useTheme() as ITheme;
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const { root, drawer } = useStyles(theme, { matchUpMd });

    return (
        <Box component="nav" css={root.css} sx={{ flexShrink: { md: 0 } }} aria-label="mailbox folders">
            <Drawer
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={leftDrawerOpened}
                onClose={() => setLeftDrawerOpened(!leftDrawerOpened)}
                css={drawer.css}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                Here comes the menu
            </Drawer>
        </Box>
    );
};

export const Sidebar = SidebarB;
