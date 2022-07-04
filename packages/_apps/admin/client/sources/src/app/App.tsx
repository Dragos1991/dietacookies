import { connect } from "react-redux";
import { FunctionComponent, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { navigationRoutes } from "../components/Navigation";
import { Dashboard, NotFound, Login, Profile } from "../pages";
import { AppBar, Toolbar, useTheme, Box } from "@dietacookies/ui-libs";
import { Main, Header, Sidebar } from "./components";
import { useStyles } from "./App.css";
import { PageWithHeading } from "../components/PageWithHeading/PageWithHeading";

const AppB: FunctionComponent = ({ currentUser }: any) => {
    const { dashboard, profile } = navigationRoutes;
    const theme = useTheme();
    const { root } = useStyles(theme);

    const [leftDrawerOpened, setLeftDrawerOpened] = useState<boolean>(true);

    return (
        <Box css={root.css}>
            {currentUser && (
                <>
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
                </>
            )}
            <Main open={leftDrawerOpened} notLogged={Boolean(currentUser)}>
                <Routes>
                    {currentUser ? (
                        <>
                            <Route
                                path={dashboard.path}
                                element={<Dashboard />}
                            />
                            <Route
                                path={profile.path}
                                element={
                                    <PageWithHeading title={profile.name}>
                                        <Profile />
                                    </PageWithHeading>
                                }
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
