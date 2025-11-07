import * as yup from 'yup'

export const initialValues = {
    email: '',
    password: ''
}

export const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email must be a valid email.')
        .required('Email required.'),
    password: yup
        .string()
        .required('Password required'),
})