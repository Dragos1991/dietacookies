import {
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    useTheme,
    Button,
    Stack,
    FormControlLabel,
    Checkbox,
} from "@dietacookies/ui-libs";
import { FunctionComponent } from "react";
import { useStyles } from "./LoginForm.css";

const LoginForm: FunctionComponent = () => {
    const theme = useTheme();
    const { root } = useStyles(theme);

    const formControls = {
        username: {
            id: "login-username",
            type: "email",
            name: "login-username",
            label: "Email Address",
        },
        password: {
            id: "login-password",
            type: "password",
            name: "login-password",
            label: "Password",
        },
    };

    return (
        <div css={root.css}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor={formControls.username.id}>
                    {formControls.username.label}
                </InputLabel>
                <OutlinedInput
                    id={formControls.username.id}
                    type={formControls.username.type}
                    name={formControls.username.name}
                    label={formControls.username.label}
                    inputProps={{}}
                />

                <FormHelperText error></FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor={formControls.password.id}>
                    {formControls.password.label}
                </InputLabel>
                <OutlinedInput
                    id={formControls.password.id}
                    type={formControls.password.type}
                    name={formControls.password.name}
                    label={formControls.password.label}
                    inputProps={{}}
                />

                <FormHelperText error></FormHelperText>
            </FormControl>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
            >
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={<Checkbox name="checked" color="primary" />}
                    label="Remember me"
                />
            </Stack>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                >
                    Sign in
                </Button>
            </FormControl>
        </div>
    );
};

export { LoginForm };
