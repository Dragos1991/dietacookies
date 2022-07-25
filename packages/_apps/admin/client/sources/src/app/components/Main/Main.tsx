import { useTheme, ITheme } from '@dietacookies/ui-libs';
import { FunctionComponent, PropsWithChildren } from 'react';
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
