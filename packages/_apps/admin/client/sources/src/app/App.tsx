import { AppBar, Box, Toolbar, useTheme } from '@dietacookies/ui-libs';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { navigationRoutes } from '../components/Navigation';
import { PageWithHeading } from '../components/PageWithHeading/PageWithHeading';
import { Dashboard, Login, NotFound, Profile } from '../pages';
import { useStyles } from './App.css';
import { Header, Main, Sidebar } from './components';

const AppB: FunctionComponent = ({ currentUser }: any) => {
    const { dashboard, profile } = navigationRoutes;
    const theme = useTheme();
    const { root } = useStyles();

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
                            transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
                        }}
                    >
                        <Toolbar>
                            <Header leftDrawerOpened={leftDrawerOpened} setLeftDrawerOpened={setLeftDrawerOpened} />
                        </Toolbar>
                    </AppBar>
                    <Sidebar leftDrawerOpened={leftDrawerOpened} setLeftDrawerOpened={setLeftDrawerOpened} />
                </>
            )}
            <Main open={leftDrawerOpened} notLogged={Boolean(currentUser)}>
                <Routes>
                    {currentUser ? (
                        <>
                            <Route path={dashboard.path} element={<Dashboard />} />
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
