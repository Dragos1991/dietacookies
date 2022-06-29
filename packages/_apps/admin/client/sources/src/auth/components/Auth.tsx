import { connect } from "react-redux";
import { FunctionComponent, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../actions";
import { FullPageLoader } from "../../components/FullPageLoader";
import { current } from "@reduxjs/toolkit";

interface IAuth {
    children: ReactNode;
    LoadCurrentUser: typeof AuthActions.LoadCurrentUser;
    currentUser: any;
    loading: boolean;
}

const AuthB: FunctionComponent<IAuth> = ({
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
        console.log(currentUser);
        if (!currentUser) {
            navigate("/login", { replace: true });
        } else {
            navigate("/dashboard", { replace: true });
        }
    }, [currentUser]);

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
