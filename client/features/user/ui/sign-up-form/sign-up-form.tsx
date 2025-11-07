import { PasswordInput } from "@/shared/ui/password-input";
import { TextInput } from "@/shared/ui/text-input";
import { Form } from "@/widgets/form"
import { Formik, FormikConfig } from "formik";
import { initialValues, validationSchema } from "./const";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { signUp } from "@/entities/user/api/sign-up";
import { userSelector } from "@/entities/user";
import { useEffect } from "react";

type FormValues = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

type SignUpForm = {
    closeModal: () => void;
}

export const SignUpForm = ({ closeModal }: SignUpForm) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userSelector);

    useEffect(() => {
        console.log("user: ", user);
    }, [user]);

    const onSubmit: FormikConfig<FormValues>['onSubmit'] =
        (values, { setSubmitting, setValues }) => {
            setSubmitting(true);

            dispatch(signUp({
                name: values.name,
                email: values.email,
                password: values.password,
                remember: true,
            }));
            console.log('Submitted: ', values);

            setValues(initialValues);
            setSubmitting(false);
            closeModal();
        }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(
                { values,
                    errors,
                    isSubmitting,
                    handleSubmit,
                    handleChange,
                }
            ) => (
                <Form
                    headerText="Sign Up"
                    submitText="Submit"
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                >
                    <TextInput
                        name='name'
                        labelText="Name"
                        value={values.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextInput
                        name='email'
                        labelText="Email"
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <PasswordInput
                        name='password'
                        labelText='Password'
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <PasswordInput
                        name='passwordConfirm'
                        labelText='Confirm password'
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        error={errors.passwordConfirm}
                    />
                </Form>)}
        </Formik>
    )
}