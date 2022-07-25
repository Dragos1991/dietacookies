import {
    Alert,
    Button,
    Checkbox,
    Collapse,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputLabel,
    OutlinedInput,
    Stack,
    useTheme,
} from '@dietacookies/ui-libs';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AuthActions } from '../../../auth/actions';
import { formControls, validationSchema } from '../utils';
import { useStyles } from './LoginForm.css';
import type { IFormikProps } from './types';

interface IProps {
    Authenticate: typeof AuthActions.Authenticate;
    errors: Record<any, any>[];
}

const LoginFormB: FunctionComponent<IProps> = ({ Authenticate, errors }) => {
    const theme = useTheme();
    const { root } = useStyles(theme);
    const validationErrors = errors;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (validationErrors) {
            setOpen(true);
        }
    }, [validationErrors]);

    const onSubmit = (values: any) => {
        Authenticate(values);
    };

    return (
        <div css={root.css}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }: IFormikProps) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 3 }}>
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
                                <Collapse in={Boolean(touched.email && errors.email)}>
                                    <FormHelperText error>{errors.email}</FormHelperText>
                                </Collapse>
                            </FormControl>
                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mb: 1 }}>
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
                                <Collapse in={Boolean(touched.password && errors.password)}>
                                    <FormHelperText error>{errors.password}</FormHelperText>
                                </Collapse>
                            </FormControl>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="remeberMe"
                                            color="primary"
                                            onBlur={handleBlur}
                                            onChange={event => {
                                                setFieldValue('rememberMe', event.target.checked);
                                            }}
                                        />
                                    }
                                    label="Remember me"
                                />
                            </Stack>
                            {errors.submit && <FormHelperText error>{errors.submit}</FormHelperText>}
                            <Collapse in={open}>
                                {validationErrors &&
                                    validationErrors.map((error: any) => {
                                        return (
                                            <Alert
                                                variant="filled"
                                                severity="error"
                                                key={error.message}
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                            >
                                                {error.message}
                                            </Alert>
                                        );
                                    })}
                            </Collapse>
                            <FormControl fullWidth sx={{ mb: 3, mt: 2 }}>
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
                        </Form>
                    );
                }}
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
    },
)(LoginFormB);

export { LoginFormB };
