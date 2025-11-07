import { Formik, FormikConfig } from 'formik';
import { ChangeEvent, useEffect } from 'react';

import {
  resetError,
  resetStatus,
  signUp,
  signUpErrorSelector,
  signUpStatusSelector,
} from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { PasswordInput } from '@/shared/ui/password-input';
import { TextInput } from '@/shared/ui/text-input';
import { Form } from '@/widgets/form';

import { initialValues, validationSchema } from './const';
import { CheckboxInput } from '@/shared/ui/checkbox-input';

type FormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  rememberMe: boolean;
};

type SignUpForm = {
  closeModal: () => void;
};

export const SignUpForm = ({ closeModal }: SignUpForm) => {
  const dispatch = useAppDispatch();
  const { isPending, isFulfilled } = useAppSelector(signUpStatusSelector);
  const signUpError = useAppSelector(signUpErrorSelector);

  useEffect(() => {
    if (isFulfilled) {
      dispatch(resetStatus(['signUpStatus']));
      closeModal();
    }
  }, [isFulfilled, closeModal, dispatch]);

  const onSubmit: FormikConfig<FormValues>['onSubmit'] = (values, { setValues }) => {
    dispatch(
      signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        remember: values.rememberMe,
      }),
    );

    setValues(initialValues);
  };

  const onChange = (e: ChangeEvent, handleChange: (a: ChangeEvent) => void) => {
    handleChange(e);
    dispatch(resetError(['signUpError']));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, setValues }) => (
        <Form
          headerText="Sign Up"
          submitText="Submit"
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          error={signUpError}
        >
          <TextInput
            name="name"
            labelText="Name"
            value={values.name}
            onChange={(e) => onChange(e, handleChange)}
            error={errors.name}
          />
          <TextInput
            name="email"
            labelText="Email"
            type="email"
            value={values.email}
            onChange={(e) => onChange(e, handleChange)}
            error={errors.email}
          />
          <PasswordInput
            name="password"
            labelText="Password"
            value={values.password}
            onChange={(e) => onChange(e, handleChange)}
            error={errors.password}
          />
          <PasswordInput
            name="passwordConfirm"
            labelText="Confirm password"
            value={values.passwordConfirm}
            onChange={(e) => onChange(e, handleChange)}
            error={errors.passwordConfirm}
          />
          <CheckboxInput
            name="rememberMe"
            labelText='Remember me'
            value={values.rememberMe}
            onChange={(e) => setValues({ ...values, rememberMe: e.target.checked, })}
          />
        </Form>
      )}
    </Formik>
  );
};
