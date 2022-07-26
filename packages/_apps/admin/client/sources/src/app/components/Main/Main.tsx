import type { FunctionComponent, PropsWithChildren } from 'react';

import type { ITheme } from '@dietacookies/ui-libs';
import { useTheme } from '@dietacookies/ui-libs';

import { useStyles } from './Main.css';

interface IMainProps {
    open: boolean;
    notLogged: boolean;
}

const MainB: FunctionComponent<PropsWithChildren & IMainProps> = ({ children, open, notLogged }) => {
    console.log(notLogged);
    const theme = useTheme() as ITheme;
    const { root, login } = useStyles(theme, { open });

    const mainCss = !notLogged ? login : root;

    return <main css={mainCss.css}>{children}</main>;
};

export const Main = MainB;
