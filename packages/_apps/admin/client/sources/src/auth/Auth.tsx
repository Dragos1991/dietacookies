import type { FunctionComponent, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FullPageLoader } from '../components/FullPageLoader/FullPageLoader';
import { AuthActions } from './actions';

interface IAuth {
    LoadCurrentUser: typeof AuthActions.LoadCurrentUser;
    currentUser: any;
    loading: boolean;
}

const AuthB: FunctionComponent<PropsWithChildren & IAuth> = ({ children, LoadCurrentUser, currentUser, loading }) => {
    const navigate = useNavigate();

    useEffect(() => {
        LoadCurrentUser();
    }, [LoadCurrentUser]);

    useEffect(() => {
        if (!currentUser && !loading) {
            navigate('/login', { replace: true });
        } else {
            navigate(window.location.pathname, { replace: true });
        }
    }, [currentUser, loading]);

    return (
        <>
            <FullPageLoader loading={loading} />
            {children}
        </>
    );
};

export const Auth = connect(
    (state: any) => {
        return {
            currentUser: state.auth.currentUser,
            loading: state.auth.loading,
        };
    },
    {
        LoadCurrentUser: AuthActions.LoadCurrentUser,
    },
)(AuthB);
