import type { FunctionComponent } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';

import { navigationRoutes } from '../../../../../components/Navigation';
import type { IUserSectionStyles } from './UserSection.css';
import { useStyles } from './UserSection.css';

interface IUserSection {}

const UserSection: FunctionComponent<IUserSection> = () => {
    const { root }: IUserSectionStyles = useStyles();

    return (
        <div css={root.css}>
            <NavLink to={navigationRoutes.profile.path}>
                <AccountCircleIcon fontSize="large" />
            </NavLink>
        </div>
    );
};

export { UserSection };
