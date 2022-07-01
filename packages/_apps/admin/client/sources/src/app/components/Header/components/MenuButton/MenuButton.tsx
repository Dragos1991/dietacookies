import {
    useTheme,
    ITheme,
    ButtonBase,
    Avatar,
    IconButton,
} from "@dietacookies/ui-libs";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import { useStyles } from "./MenuButton.css";

interface IMenuButtonProps {
    setLeftDrawerOpened: Dispatch<SetStateAction<boolean>>;
    leftDrawerOpened: boolean;
}

const MenuButtonB: FunctionComponent<IMenuButtonProps> = ({
    setLeftDrawerOpened,
    leftDrawerOpened,
}) => {
    const theme = useTheme() as ITheme;
    const { avatar } = useStyles(theme);

    return (
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Avatar
                variant="rounded"
                css={avatar.css}
                onClick={() => setLeftDrawerOpened(!leftDrawerOpened)}
                color="inherit"
            >
                <MenuIcon />
            </Avatar>
        </ButtonBase>
    );
};

export const MenuButton = MenuButtonB;
