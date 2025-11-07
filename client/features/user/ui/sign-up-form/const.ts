import * as yup from 'yup'

export const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
}

export const validationSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, 'Name must have at least 3 characters.')
        .required('Name required.'),
    email: yup
        .string()
        .email('Email must be a valid email.')
        .required('Email required.'),
    password: yup
        .string()
        .min(8)
        .required('Passwords required'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match.')
        .min(8)
        .required('Password confirm required.')
})