import Form from '@/components/atoms/Form';
import Input from '@/components/atoms/Input';
import SaveButton from '@/components/atoms/SaveButton';
import AuthLayout from '@/components/layout/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/utils/schema-types';
import { User as UserSchema } from '@/utils/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';

function Page(): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError,
  } = useForm<User>({
    defaultValues: { email: 'uguremirmustafa@gmail.com', password: 'ugur1234' },
    resolver: zodResolver(UserSchema),
  });

  const auth = useAuth();

  function loginUser(data: User) {
    auth.login(data, () =>
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid',
      })
    );
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(loginUser)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} label="Email" error={errors?.email} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Password" type="password" error={errors?.email} />
          )}
        />
        <SaveButton className="mt-4" loading={false} disabled={!isValid} />
      </Form>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

Page.guestGuard = true;

export default Page;
