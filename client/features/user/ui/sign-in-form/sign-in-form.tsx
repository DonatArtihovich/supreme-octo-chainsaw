import { Formik, FormikConfig } from 'formik';
import { ChangeEvent, useEffect } from 'react';

import { signIn, signInErrorSelector, signInStatusSelector } from '@/entities/user';
import { resetError, resetStatus } from '@/entities/user/model/slice';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { PasswordInput } from '@/shared/ui/password-input';
import { TextInput } from '@/shared/ui/text-input';
import { Form } from '@/widgets/form';

import { initialValues, validationSchema } from './const';
import { CheckboxInput } from '@/shared/ui/checkbox-input';

type SignInFormProps = {
  closeModal: () => void;
};

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const SignInForm = ({ closeModal }: SignInFormProps) => {
  const dispatch = useAppDispatch();
  const { isPending, isFulfilled } = useAppSelector(signInStatusSelector);
  const signInError = useAppSelector(signInErrorSelector);

  useEffect(() => {
    if (isFulfilled) {
      resetStatus(['signInStatus']);
      closeModal();
    }
  }, [isFulfilled, closeModal, dispatch]);

  const onSubmit: FormikConfig<FormValues>['onSubmit'] = (values, { setValues }) => {
    dispatch(
      signIn({
        email: values.email,
        password: values.password,
        remember: values.rememberMe,
      }),
    );

    setValues(initialValues);
  };

  const onChange = (e: ChangeEvent, handleChange: (a: ChangeEvent) => void) => {
    handleChange(e);
    dispatch(resetError(['signInError']));
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
          headerText="Sign In"
          submitText="Submit"
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          error={signInError}
        >
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
