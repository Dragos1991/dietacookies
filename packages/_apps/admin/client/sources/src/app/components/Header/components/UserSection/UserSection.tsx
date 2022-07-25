import type { ITheme } from '@dietacookies/ui-libs';
import { useTheme } from '@dietacookies/ui-libs';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import { navigationRoutes } from '../../../../../components/Navigation';
import type { IUserSectionStyles } from './UserSection.css';
import { useStyles } from './UserSection.css';

interface IUserSection {}

const UserSection: FunctionComponent<IUserSection> = () => {
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
