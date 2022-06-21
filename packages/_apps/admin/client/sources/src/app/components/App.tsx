import { connect } from "react-redux";
import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { navigationRoutes } from "../../components/Navigation";
import { Dashboard, NotFound, Login } from "../../pages";

const AppB: FunctionComponent = ({ currentUser }: any) => {
    const { dashboard } = navigationRoutes;
    return (
        <Routes>
            {currentUser ? (
                <>
                    <Route path={dashboard.path} element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </>
            ) : (
                <Route path="/login" element={<Login />} />
            )}
        </Routes>
    );
};

export const App = connect((state: any) => {
    return {
        currentUser: state.auth.currentUser,
    };
})(AppB);
