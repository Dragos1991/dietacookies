import * as yup from 'yup';
import { formControls } from './formControls';

export const validationSchema = yup.object({
    [formControls.username.name]: yup
        .string()
        .required('Email address is required.')
        .email('Email address must be valid.'),
    [formControls.password.name]: yup.string().required('Password is required.'),
});
