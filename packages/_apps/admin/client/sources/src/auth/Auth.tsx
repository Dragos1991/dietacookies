import { connect } from "react-redux";
import {
    FunctionComponent,
    PropsWithChildren,
    ReactNode,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "./actions";
import { FullPageLoader } from "../components/FullPageLoader/FullPageLoader";

interface IAuth {
    LoadCurrentUser: typeof AuthActions.LoadCurrentUser;
    currentUser: any;
    loading: boolean;
}

const AuthB: FunctionComponent<PropsWithChildren & IAuth> = ({
    children,
    LoadCurrentUser,
    currentUser,
    loading,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        LoadCurrentUser();
    }, [LoadCurrentUser]);

    useEffect(() => {
        if (!currentUser && !loading) {
            navigate("/login", { replace: true });
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
    }
)(AuthB);
