import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { Form } from '@/components/ui/form.tsx';
import FormInner from '@/components/auth/FormInner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { registerFormSchema } from '@/lib/zod/schemas.ts';
import { useAuth } from '@/apis/useAuth.ts';

export default function RegisterPage() {
  const location = useLocation();
  const { authServerCall } = useAuth();

  const isSeller = location.pathname === '/register/seller';

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      userName: '',
    },
  });

  const submitHandler = async (values: z.infer<typeof registerFormSchema>) => {
    await authServerCall({ type: 'register', data: values, isSeller });
  };

  return (
    <>
      <div className={'pb-6'}>
        <AuthHeading text={`${isSeller ? '판매자' : '소비자'} 회원가입`} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormInner form={form} name={'email'} label={'이메일'} />
            <FormInner form={form} name={'userName'} label={'이름'} />
            <FormInner form={form} name={'password'} label={'비밀번호'} isRegister={true} />
            <Button className={'w-full mt-10 py-6'} type={'submit'}>
              회원가입 하기
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
