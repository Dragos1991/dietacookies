import type { FunctionComponent } from 'react';

import { Grid, Typography, useTheme } from '@dietacookies/ui-libs';

import imageLogin from './assets/loginImage.jpg';
import { LoginForm } from './components';
import { useStyles } from './Login.css';

const Login: FunctionComponent = () => {
    const theme = useTheme();
    const { alignSelf, root, leftSection, title, rightWrap, rightContainer, logo } = useStyles(theme);

    return (
        <Grid container justifyContent="center" spacing={2} css={root.css}>
            <Grid item xs={12} md={6} css={leftSection.css}></Grid>
            <Grid item xs={12} md={6} alignSelf="center" css={rightWrap.css}>
                <Grid container alignSelf="center" alignItems="center" spacing={2}>
                    <div css={rightContainer.css}>
                        <img src={imageLogin} css={[logo.css, alignSelf.css]} />
                        <Typography variant="h1" css={title.css}>
                            Dieta Cookies
                        </Typography>
                        <LoginForm />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export { Login };
