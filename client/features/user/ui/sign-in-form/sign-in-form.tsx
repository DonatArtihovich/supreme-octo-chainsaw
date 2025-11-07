import { TextInput } from "@/shared/ui/text-input";
import { Form } from "@/widgets/form"
import { Formik, FormikConfig } from "formik";
import { ChangeEvent, useCallback, useEffect } from "react"
import { initialValues, validationSchema } from "./const";
import { PasswordInput } from "@/shared/ui/password-input";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { signIn, signInErrorSelector, signInStatusSelector } from "@/entities/user";
import { resetError, resetStatus } from "@/entities/user/model/slice";

type SignInFormProps = {
    closeModal: () => void;
}

type FormValues = {
    email: string;
    password: string;
}

export const SignInForm = ({ closeModal }: SignInFormProps) => {
    const dispatch = useAppDispatch();
    const { isPending, isFulfilled } = useAppSelector(signInStatusSelector);
    const signInError = useAppSelector(signInErrorSelector);

    useEffect(() => {
        if (isFulfilled) {
            resetStatus(['signInStatus']);
            closeModal();
        }
    }, [isFulfilled]);

    const onSubmit: FormikConfig<FormValues>['onSubmit'] = useCallback(
        (values, { setValues }) => {
            dispatch(signIn({
                email: values.email,
                password: values.password,
                remember: true,
            }));

            setValues(initialValues);
        }, []);

    const onChange = useCallback((
        e: ChangeEvent,
        handleChange: (a: ChangeEvent) => void
    ) => {
        handleChange(e);
        dispatch(resetError(['signInError']));
    }, [])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onSubmit}
        >
            {(
                { values,
                    errors,
                    handleSubmit,
                    handleChange,
                }
            ) => (
                <Form
                    headerText="Sign In"
                    submitText="Submit"
                    onSubmit={handleSubmit}
                    isSubmitting={isPending}
                    error={signInError}
                >
                    <TextInput
                        name='email'
                        labelText="Email"
                        type='email'
                        value={values.email}
                        onChange={(e) => onChange(e, handleChange)}
                        error={errors.email}
                    />
                    <PasswordInput
                        name='password'
                        labelText='Password'
                        value={values.password}
                        onChange={(e) => onChange(e, handleChange)}
                        error={errors.password}
                    />
                </Form>)}
        </Formik>
    )
}