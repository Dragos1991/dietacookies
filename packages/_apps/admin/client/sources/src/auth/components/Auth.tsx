import { connect } from "react-redux";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../actions";

interface IAuth {
    children: ReactNode;
    LoadCurrentUser: typeof AuthActions.LoadCurrentUser;
}

const AuthB: FunctionComponent<IAuth> = ({ children, LoadCurrentUser }) => {
    const currentUser = null;
    const navigate = useNavigate();

    const data = {
        currentUser: null,
    };

    useEffect(() => {
        LoadCurrentUser();
    }, [LoadCurrentUser]);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login", { replace: true });
        }
    }, [currentUser]);

    return <>{children}</>;
};

export const Auth = connect(null, {
    LoadCurrentUser: AuthActions.LoadCurrentUser,
})(AuthB);
