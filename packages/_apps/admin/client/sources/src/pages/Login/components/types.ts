import { FormikProps, FormikTouched, FormikErrors } from "formik";

export interface IFormikProps extends FormikProps<{}> {
    touched: FormikTouched<{
        email: string;
        password: string;
    }>;
    errors: FormikErrors<{
        email: string;
        password: string;
        submit?: string;
    }>;
    values: {
        email?: string;
        password?: string;
        rememberMe?: boolean;
    };
}
