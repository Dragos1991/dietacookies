import { useTheme, ITheme } from "@dietacookies/ui-libs";
import { FunctionComponent, PropsWithChildren } from "react";
import { useStyles } from "./Main.css";

interface IMainProps {
    open: boolean;
}

const MainB: FunctionComponent<PropsWithChildren & IMainProps> = ({
    children,
    open,
}) => {
    const theme = useTheme() as ITheme;
    const { root } = useStyles(theme, { open });

    return <main css={root.css}>{children}</main>;
};

export const Main = MainB;
