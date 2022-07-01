import { connect } from "react-redux";
import { FunctionComponent, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { navigationRoutes } from "../components/Navigation";
import { Dashboard, NotFound, Login } from "../pages";
import { AppBar, Toolbar, useTheme, Box } from "@dietacookies/ui-libs";
import { Main, Header, Sidebar } from "./components";

const AppB: FunctionComponent = ({ currentUser }: any) => {
    const { dashboard } = navigationRoutes;
    const theme = useTheme();

    const [leftDrawerOpened, setLeftDrawerOpened] = useState<boolean>(true);

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened
                        ? theme.transitions.create("width")
                        : "none",
                }}
            >
                <Toolbar>
                    <Header
                        leftDrawerOpened={leftDrawerOpened}
                        setLeftDrawerOpened={setLeftDrawerOpened}
                    />
                </Toolbar>
            </AppBar>
            <Sidebar
                leftDrawerOpened={leftDrawerOpened}
                setLeftDrawerOpened={setLeftDrawerOpened}
            />
            <Main open={leftDrawerOpened}>
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
                        <Route path="/login" element={<Login />} />
                    )}
                </Routes>
            </Main>
        </Box>
    );
};

export const App = connect((state: any) => {
    return {
        currentUser: state.auth.currentUser,
    };
})(AppB);
