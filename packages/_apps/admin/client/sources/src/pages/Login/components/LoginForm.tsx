import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Stack,
    useTheme,
} from "@dietacookies/ui-libs";
import { connect } from "react-redux";

import { Formik, Form } from "formik";

import { FunctionComponent } from "react";
import { useStyles } from "./LoginForm.css";
import { AuthActions } from "../../../auth/actions";
import { IFormikProps } from "./types";
import { formControls, validationSchema } from "../utils";

interface IProps {
    Authenticate: typeof AuthActions.Authenticate;
    errors: Record<any, any>[];
}

const LoginFormB: FunctionComponent<IProps> = ({ Authenticate, errors }) => {
    const theme = useTheme();
    const { root } = useStyles(theme);
    const validationErrors = errors;

    const onSubmit = (values: any) => {
        Authenticate(values);
    };

    return (
        <div css={root.css}>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false,
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    touched,
                    values,
                }: IFormikProps) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ mb: 3 }}
                        >
                            <InputLabel htmlFor={formControls.username.id}>
                                {formControls.username.label}
                            </InputLabel>
                            <OutlinedInput
                                id={formControls.username.id}
                                type={formControls.username.type}
                                value={values.email}
                                name={formControls.username.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label={formControls.username.label}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error>
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ mb: 3 }}
                        >
                            <InputLabel htmlFor={formControls.password.id}>
                                {formControls.password.label}
                            </InputLabel>
                            <OutlinedInput
                                id={formControls.password.id}
                                type={formControls.password.type}
                                value={values.password}
                                name={formControls.password.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label={formControls.password.label}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error>
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                        >
                            <FormControlLabel
                                sx={{ mb: 3 }}
                                control={
                                    <Checkbox
                                        name="remeberMe"
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={(event) => {
                                            setFieldValue(
                                                "rememberMe",
                                                event.target.checked
                                            );
                                        }}
                                    />
                                }
                                label="Remember me"
                            />
                        </Stack>
                        {errors.submit && (
                            <FormHelperText error>
                                {errors.submit}
                            </FormHelperText>
                        )}
                        {validationErrors &&
                            validationErrors.map((error: any) => {
                                return (
                                    <Alert
                                        variant="filled"
                                        severity="error"
                                        key={error.message}
                                        sx={{ mb: 3 }}
                                    >
                                        {error.message}
                                    </Alert>
                                );
                            })}
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <Button
                                disableElevation
                                fullWidth
                                disabled={isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Sign in
                            </Button>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export const LoginForm = connect(
    (state: any) => {
        return {
            errors: state.auth.errors,
        };
    },
    {
        Authenticate: AuthActions.Authenticate,
    }
)(LoginFormB);

export { LoginFormB };
