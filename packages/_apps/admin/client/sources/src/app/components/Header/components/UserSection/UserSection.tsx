import { useTheme, ITheme } from "@dietacookies/ui-libs";
import { FunctionComponent } from "react";

import { useStyles, IUserSectionStyles } from "./UserSection.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { navigationRoutes } from "../../../../../components/Navigation";

interface IUserSection {}

const UserSection: FunctionComponent<IUserSection> = ({}) => {
    const theme = useTheme() as ITheme;
    const { root }: IUserSectionStyles = useStyles(theme);

    return (
        <div css={root.css}>
            <NavLink to={navigationRoutes.profile.path}>
                <AccountCircleIcon fontSize="large" />
            </NavLink>
        </div>
    );
};

export { UserSection };
