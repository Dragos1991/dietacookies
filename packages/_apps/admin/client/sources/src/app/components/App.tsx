import { Box } from "@mui/material";
import { connect } from "react-redux";
import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation, navigationRoutes } from "../../components/Navigation";
import { Dashboard, NotFound } from "../../pages";

const AppB: FunctionComponent = ({ currentUser }: any) => {
    const { dashboard } = navigationRoutes;
    return (
        <Box sx={{ display: "flex" }}>
            {currentUser && <Navigation />}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Routes>
                    {currentUser ? (
                        <>
                            <Route
                                path={dashboard.path}
                                element={<Dashboard />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </>
                    ) : (
                        <Route path="/login" element={<div>Login page</div>} />
                    )}
                </Routes>
            </Box>
        </Box>
    );
};

export const App = connect((state: any) => {
    return {
        currentUser: state.auth.currentUser,
    };
})(AppB);
